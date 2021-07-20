from tethys_sdk.base import TethysAppBase, url_map_maker


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
        )

        return url_maps