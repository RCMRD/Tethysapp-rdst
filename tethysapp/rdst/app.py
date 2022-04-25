from tethys_sdk.base import TethysAppBase, url_map_maker
from tethys_sdk.app_settings import PersistentStoreDatabaseSetting


class Rdst(TethysAppBase):
    """
    Tethys app class for Rangelands Decision Support Tool.
    """

    name = 'Rangelands Decision Support Tool'
    index = 'rdst:home'
    icon = 'rdst/images/icon.gif'
    package = 'rdst'
    root_url = 'rdst'
    color = '#8e44ad'
    description = 'Temporal assessment and monitoring of rangeland resources'
    tags = 'modis, forecast, vci, seasonal, timeseries'
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='app',
                url='app',
                controller='rdst.controllers.app'
            ),
            UrlMap(
                name='home',
                url='home',
                controller='rdst.controllers.home'
            ),
            UrlMap(
                name='dash',
                url='dash',
                controller='rdst.controllers.dash'
            ),
            UrlMap(
                name='tool',
                url='tool',
                controller='rdst.controllers.tool'
            ),
            UrlMap(
                name='login',
                url='login',
                controller='rdst.controllers.login'
            ),
            UrlMap(
                name='get_map',
                url='rdst/app/get_map',
                controller='rdst.ajax_controller.get_map'
            ),
            UrlMap(
                name='get_cmap',
                url='rdst/app/get_cmap',
                controller='rdst.ajax_controller.get_cmap'
            ),
            UrlMap(
                name='get_forecast',
                url='rdst/app/get_forecast',
                controller='rdst.ajax_controller.get_forecast'
            ),
        )

        return url_maps

    def persistent_store_settings(self):
        ps_settings = (
            PersistentStoreDatabaseSetting(
                name='primary_db',
                description='primary database',
                initializer='rdst.model.init_primary_db',
                required=True
                ),
            )
        return ps_settings