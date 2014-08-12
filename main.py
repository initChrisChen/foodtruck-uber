import urllib2
import cgi
import webapp2
import json
import jinja2
import os
from google.appengine.ext import ndb

#ndb_keys = []; used for retrieval but due to free ndb limits bypassed
json_data = []
first_load = True

JINJA_ENVIRONMENT = jinja2.Environment(
	loader = jinja2.FileSystemLoader(os.path.dirname(__file__)),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)

class FoodTruck(ndb.Model):#would be used for ndb database
	latitude = ndb.FloatProperty()
	longitude = ndb.FloatProperty()
	name = ndb.StringProperty()
	serves = ndb.StringProperty()
	address = ndb.StringProperty()
		
class updateJSON(webapp2.RequestHandler):#get JSON from url, strip unneccesary information, store as json_data. Commented out lines indicate using ndb datastore, however due to write limits on app engine had to forgo.
	def get(self):
		del json_data[:]#clear prev
		resp = urllib2.urlopen('http://data.sfgov.org/resource/rqzj-sfat.json?&$$app_token=grkQpHFFQ0WSk9q6x9ravKovj')
		data = json.load(resp)
		for truck in data:
			if (truck["status"] == "APPROVED" and "latitude" in truck.keys() and "longitude" in truck.keys() and "applicant" in truck.keys() and "fooditems" in truck.keys() and "address" in truck.keys()):
				tmp_foodtruck = {"latitude" : float(truck["latitude"]), "longitude" : float(truck["longitude"]), "name" : str(truck["applicant"]), "serves" : str(truck["fooditems"]), "address" : str(truck["address"])}
				json_data.append(tmp_foodtruck)
#				tmp_foodtruck = FoodTruck(latitude = float(truck["latitude"]), longitude = float(truck["longitude"]), name = str(truck["applicant"]), serves = str(truck["fooditems"]), address = str(truck["address"]))
#				tmp_key = tmp_foodtruck.put()
#				ndb_keys.append(tmp_k`ey)
#		json_data = json.dump([truck.to_dict() for truck in FoodTruck.query().fetch()])
		self.redirect("/")
		
class MainPage(webapp2.RequestHandler):
	def get(self):
		global first_load
		if (first_load):
			first_load = False
			self.redirect('/update')
		else:
			template_values = {
				'json_data': json.dumps(json_data),
				}
			template = JINJA_ENVIRONMENT.get_template('index.html')
			self.response.write(template.render(template_values))
		
application = webapp2.WSGIApplication([
	('/update', updateJSON),
	('/', MainPage)
	], debug=True)