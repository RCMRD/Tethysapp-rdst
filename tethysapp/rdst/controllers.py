from django.shortcuts import render, reverse
from tethys_sdk.permissions import login_required
from tethys_sdk.gizmos import Button, MapView, MVView
from .select_controls import controls, counties
from .config import buttons as bt

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
    context = {
        'controls': controls,
        'counties': counties,
    }

    return render(request, 'rdst/app.html', context)

def login(request):
    context = {
    }

    return render(request, 'rdst/login.html', context)