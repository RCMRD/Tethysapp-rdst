from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import sessionmaker

from .app import Rdst as app

Base = declarative_base()


class Forecast(Base):
	__tablename__= 'forecasts'

	#Columns
	id = Column(Integer, primary_key=True)
	filename = Column(String)
	date = Column(String)
	ftype = Column(String)
	description = Column(String)
	region = Column(String)

def addNewForecast(filename,date, ftype, description, region):
	newForecast = Forecast(
		filename = filename,
		date = date,
		ftype = ftype,
		description = description,
		region = region
	)

	# Connect to the database
	Session = app.get_persistent_store_database('primary_db',as_sessionmaker=True)
	session = Session()
	allForecasts = getAllForecasts()

	if newForecast not in allForecasts:
		session.add(newForecast)

	# Commit
	session.commit()
	session.close()

def getAllForecasts():
	Session = app.get_persistent_store_database('primary_db', as_sessionmaker=True)
	session = Session()

	forecasts = session.query(Forecast).all()
	session.close()

	return forecasts

def init_primary_db(engine, first_time):
	Base.metadata.create_all(engine)

	if first_time:
		Session = sessionmaker(bind=engine)
		session = Session()

		file1 = Forecast(
			filename = 'rdst/forecasts/ABAKAILE_202105_Zonal_Statistics.pdf',
			date = '202105',
			ftype ='Zonal_Statistics',
			description ='Ward Zonal Statistics',
			region = 'ABAKAILE'
		)

		file2 = Forecast(
			filename = 'rdst/forecasts/ABOGETA_EAST_202105_Zonal_Statistics.pdf',
			date = '202105',
			ftype ='Zonal_Statistics',
			description ='Ward Zonal Statistics',
			region = 'ABOGETA_EAST'
		)

		session.add(file1)
		session.add(file2)
		session.commit()
		session.close()

def getForecast(date,ftype,description,region):
	Session = app.get_persistent_store_database('primary_db', as_sessionmaker=True)
	session = Session()

	forecast = session.query(Forecast).filter(Forecast.date==date,Forecast.ftype==ftype,\
		Forecast.description==description,Forecast.region==region).first()
	print(forecast)
	# print(forecast.__dict__)
	session.close()

	if forecast:
		return forecast.filename
	else:
		return None
