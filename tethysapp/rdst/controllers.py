from django.shortcuts import render, reverse
from tethys_sdk.permissions import login_required
from tethys_sdk.gizmos import Button, MapView, MVView
from .select_controls import controls

@login_required()
def home(request):
    app_button = Button (
        display_text = "Launch App",
        name = 'launch_app',
        style='success',
        href=reverse('rdst:app')
        )

    context = {
    'launch_app': app_button
    }
    return render(request, 'rdst/home.html', context)

def app(request):
    map_view = MapView(
        height='100%',
        width='100%',
        controls=[
            'ZoomSlider','Rotate','FullScreen',
            {'ZoomToExtent':{
                'projection':'EPSG:4326',
                'extent': [29.25,-4.75,46.25,5.2]
            }}
        ],
        basemap=[
            'CartoDB',
            {'CartoDB': {'style':'dark'}},
            'OpenStreetMap',
            'Stamen',
            'ESRI'],
        view=MVView(
            projection='EPSG:4326',
            center=[37.880859,0.219726],
            zoom=9,
            maxZoom = 20,
            minZoom = 2
            )
        )
    context = {
        'map_view': map_view,
        'controls': controls
    }

    return render(request, 'rdst/app.html', context)

def login(request):
    context = {
    }

    return render(request, 'rdst/login.html', context)