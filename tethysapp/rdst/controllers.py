from django.shortcuts import render, reverse
from tethys_sdk.permissions import login_required
from tethys_sdk.gizmos import Button, MapView, MVView
from .select_controls import controls, counties, upDB
from .config import buttons as bt
from .updateForecastDB import popDB as udb
from .app import Rdst as app

@login_required()
def home(request):
    app_button = Button (
        display_text = "Launch App",
        name = 'launch_app',
        style='success',
        href=reverse('rdst:tool')
        )

    context = {
    'launch_app': app_button
    }
    return render(request, 'rdst/home.html', context)

def dash(request):


    context = {
    }
    return render(request, 'rdst/dashboard.html', context)

def tool(request):

    context = {
    }
    return render(request, 'rdst/tool.html', context)

def app(request):
    # udb(year='2021', montha='04', monthb='05', monthc='06', day='21')
    context = {
        'controls': controls,
        'counties': counties,
        'upDB': upDB
    }

    return render(request, 'rdst/app.html', context)

def login(request):
    context = {
    }

    return render(request, 'rdst/login.html', context)