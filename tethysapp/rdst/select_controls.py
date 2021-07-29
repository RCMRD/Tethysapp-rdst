controls = {
    '...': {
        'display': 'Choose an Option ...'
    },
    'GVI': {
        'display': 'Greeness Vegetation Index',
        'options' : {
            '...': {
                'display': 'Choose an Option ...'
            },
            'NDVI': {
                'display': 'Normalized Difference Vegetation Index',
                'options': {
                    '...': {
                        'display': 'Choose an Option ...'
                    },
                    'nrt' : {
                        'display': 'Near Real Time',
                        'start_year': '2018',
                        'start_mon': '01',
                        'start_dekad': '01'
                        },
                    'monthly': {
                        'display': 'Monthly',
                        'start_year': '2018',
                        'start_mon': '01',
                        'start_dekad': '01'
                    },
                    'seasonal': {
                        'display': 'seasonal',
                        'start_year': '2018',
                        'start_mon': '01',
                        'start_dekad': '01'
                    }
                }
            },
            'NDVIAno': {
                'display': 'Normalized Vegetation Difference Index Anomaly',
            },
            'VCI': {
                'display': 'Vegetation Condition Index'
            },
        }
    },
    'CMP': {
        'display' : 'Compose Map',
        'options': {
            'display': {
                'display': 'Under development ...'
            }
        }
    },
    'Model':{
        'display': 'View Forecasts',
        'options': {
            '...':{
                'display': 'Choose an Option ...'
            },
            'Forecasts':{
                'display': 'PDF Forecasts',
                'options': {
                    '...': {
                        'display': 'Choose an Option ...'
                    },
                    'county': {
                        'display': 'County Zonal Statistics'
                    },
                    'ward': {
                        'display': 'Wards Zonal Statistics'
                    },
                    'conservancies': {
                        'display': 'Conservancies Zonal Statistics'
                    },
                },
            },
            'Moving Averages':{},
        }
    }
}
counties = {
    "Mombasa": "Mombasa",
    "Kwale":"Kwale",
    "Kilifi":"Kilifi",
    "Tana River":"Tana River",
    "Lamu":"Lamu",
    "Taita–Taveta":"Taita-Taveta",
    "Garissa":"Garissa",
    "Wajir":"Wajir",
    "Mandera":"Mandera",
    "Marsabit":"Marsabit",
    "Isiolo":"Isiolo",
    "Meru":"Meru",
    "Tharaka-Nithi":"Tharaka-Nithi",
    "Embu":"Embu",
    "Kitui":"Kitui",
    "Machakos":"Machakos",
    "Makueni":"Makueni",
    "Nyandarua":"Nyandarua",
    "Nyeri":"Nyeri",
    "Kirinyaga":"Kirinyaga",
    "Murang'a":"Murang'a",
    "Kiambu":"Kiambu",
    "Turkana":"Turkana",
    "West Pokot":"West Pokot",
    "Samburu":"Samburu",
    "Trans-Nzoia":"Trans-Nzoia",
    "Uasin Gishu":"Uasin Gishu",
    "Elgeyo-Marakwet":"Elgeyo-Marakwet",
    "Nandi":"Nandi",
    "Baringo":"Baringo",
    "Laikipia":"Laikipia",
    "Nakuru":"Nakuru",
    "Narok":"Narok",
    "Kajiado":"Kajiado",
    "Kericho":"Kericho",
    "Bomet":"Bomet",
    "Kakamega":"Kakamega",
    "Vihiga":"Vihiga",
    "Bungoma":"Bungoma",
    "Busia":"Busia",
    "Siaya":"Siaya",
    "Kisumu":"Kisumu",
    "Homa Bay":"Homa Bay",
    "Migori":"Migori",
    "Kisii":"Kisii",
    "Nyamira":"Nyamira",
    "Nairobi":"Nairobi"
}
conservancies = {
    "BNR":"Bufallo_National_Reserve",
    "SNR": "Shaba_National_Reserve"
}
wards = {
    "Bamba":"BAMBA",
    "Garbatula": "GARBATULA",
    "Gaturi North": "GATURI_NORTH"
}
ftypes = {
    "ZS": "Zonal_Statistics",
    "MA" : "Moving_Averages",
    "FF" : "Forecasts for "
}
years = {
    "2020":"2020",
    "2021":"2021"
}
months = {
    "01":"01","02":"02","03":"03","04":"04","05":"05","06":"06","07":"07","08":"08",
    "09":"09","10":"10","11":"11","12":"12"
}

upDB = {
    "...": {
        "display": "Choose Regions to View"
    },
    "Counties":{
        "display": "Kenyan Counties",
        "options": counties
    },
    "Wards":{
        "display": "Kenyan Wards",
        "options": wards
    },
    "Conservancies":{
        "display": "Kenyan Conservancies",
        "options": conservancies
    }
}