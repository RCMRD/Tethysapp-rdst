var app_control = (function () {
	/*
	* GLOBAL VARIABLES
	*/
	var public_interface;
	var dims = {
		  a0: [1189, 841],
		  a1: [841, 594],
		  a2: [594, 420],
		  a3: [420, 297],
		  a4: [297, 210],
		  a5: [210, 148],
		};

	// selector variables
	var m_option1, m_option2, m_option3, map_layers, controls,html2canvas;
	/*
	* FUNCTIONS
	*/
	var bind_controls,update_options, create_pdf, create_map, init_all;
	
	/* 
	* FUNCTION IMPLEMENTATIONS
	*/
	// map_layers = new ol.layer.Tile ({
	// 	source: new ol.source.OSM()
	// })

	// create_map = function(){

	// 	var map = new ol.Map ({
	// 		layers:[map_layers],
	// 		target:'map',
	// 		view: new ol.View({
	// 			center: ol.proj.fromLonLat([34,0]),
	// 			zoom: 10
	// 		})
	// 	})
	// };

	update_options = function(){
		$('#option2').remove();
		$('#option3').remove();
		m_option1 = $('#option1').val();

		if (typeof controls[m_option1]['options'] != "undefined") {
			var select = $(`<select id="option2"></select>`);
			$('#navpanel').append($(select));
			for (var k in controls[m_option1]['options']){
				$('#option2').append($('<option>', {
					value:k,
					text: controls[m_option1]['options'][k]['display']
				}));
			};

			
			$('#option2').on('change', function(){
				if (typeof $('#option3').remove() != "unrecognized expression") {
					$('#option3').remove();

					m_option2 = $('#option2').val();

					if (typeof controls[m_option1]['options'][m_option2]['options'] != "undefined") {
						var select = $(`<select id="option3"></select>`);
						$('#navpanel').append($(select));
						for (var n in controls[m_option1]['options'][m_option2]['options']) {
							$('#option3').append($('<option>', {
								value:n,
								text: controls[m_option1]['options'][m_option2]['options'][n]['display']
							}));
						};
					} else {
						alert ('Option does not exist');
					};
				};
			});
		} else {
			alert('Option does not exist');
		};
	};

	bind_controls = function() {
		$('#option1').on('change', function(){
			let option1 = $('#option1').val();

			if (option1 !== m_option1) {
				m_option1 = option1;
				update_options();
			};
		});

		$('#option2').on('change', function(){
			alert('They changed it again');
		});
	};
	create_pdf = function() {
		$('#createPDF').on('click',function(){
			var exportButton = $('#createPDF');
			exportButton.disabled = true ;
			document.body.style.cursor = 'progress';
			var map = TETHYS_MAP_VIEW.getMap(); 
			var mapsize = map.getSize();
			var mapRes = map.getView().getResolution();
			var format = 'a4';
			var dim = dims[format];
			var resolution = 300;
			var width = Math.round((dim[0] * resolution) / 25.4);
			var height = Math.round((dim[1] * resolution) / 25.4);
			map.once('rendercomplete', function(){
				var mapCanvas = document.createElement('canvas');
				mapCanvas.width = width;
				mapCanvas.height = height;
				var mapContext = mapCanvas.getContext('2d');
				Array.prototype.forEach.call(
					document.querySelectorAll('.ol-viewport canvas'),
					function(canvas){
						// if (canvas.width > 0) {
						// 	var opacity = canvas.parentNode.style.opacity;
						// 	mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
						// 	var transform = canvas.style.transform;
						// 	var matrix = transform
						// 					.match(/^matrix\(([^\(]*)\)$/)[1]
						// 					.split(',')
						// 					.map(Number);
						// 	CanvasRenderingContext2D.prototype.setTransform.apply(
						// 		mapContext,
						// 		[1, 0, 0, 1, 0, 0]
						// 		);
						// 	mapContext.drawImage(canvas, 0, 0);
						// }
					}
				);
				// var element = document.querySelectorAll('.ol-viewport canvas');
				// var opt = {
				// 	margin: 1,
				// 	filename: { type:'jpeg', quality: 0.2 },
				// 	html2canvas: { scale: 2 },
				// 	jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
				// };
				// html2pdf().set(opt).from(element).save();
				var pdf = new jspdf.jsPDF("landscape", undefined, format);
				// // pdf.text("Sample PDF using OpenStreet Maps", 35, 25);
				// pdf.fromHTML(document.body);
				// pdf.save();
				// 	.canvas, {
				// 	callback: function (pdf) {
				// 		pdf.save();
				// 	},
				// 	x: width,
				// 	y: height
				// });
				pdf.addImage(
					mapCanvas.toDataURL('image/jpeg'),
					'JPEG',
					0,
					0,
					dim[0],
					dim[1]
					);
				pdf.save('map.pdf');
				map.setSize(mapsize);
				map.getView().setResolution(mapRes);
				exportButton.disabled = false;
				document.body.style.cursor = 'auto';
			});
			var printSize = [width, height];
			map.setSize(printSize);
			var scaling = Math.min(width / mapsize[0], height / mapsize[1]);
			map.getView().setResolution(mapRes / scaling);
		}
		// ,
		// false
		);
		
	};

	init_all = function(){
		bind_controls();
		create_pdf();
	};

	/*
	* PUBLIC INTERFACE
	*/
	public_interface = {};
	/*

	* INITIALIZATIONS
	*/
	$(function(){
		// initialize constants

		// const jspdf = window.jspdf;
		controls = $('#navpanel').data('controls');
		var select = $(`<select id="option1"></select>`);
		$('#navpanel').append($(select));
		for (var i in controls) {
			$('#option1').append($('<option>', {
			value: i,
			text: controls[i]['display']
		}))
		}
		// initialize variables
		m_option1 = $('#option1').val();
		m_option2 = $('#option2').val();
		m_option3 = $('#option3').val();
		init_all();
	});

	return public_interface;
}());