(function(global) {

	"use strict";

	var fabric = global.fabric || (global.fabric = {}),
	extend = fabric.util.object.extend,
		clone = fabric.util.object.clone;

	if (fabric.CurvedText) {
		fabric.warn('fabric.CurvedText is already defined');
		return;
	}
	var stateProperties = fabric.Text.prototype.stateProperties.concat();
	stateProperties.push(
			'radius',
			'spacing',
			'effect',
			'range',
			'reverse',
			'largeFont',
			'smallFont'
	);
	var _dimensionAffectingProps = fabric.Text.prototype._dimensionAffectingProps;
	_dimensionAffectingProps['radius']			= true;
	_dimensionAffectingProps['effect']			= true;
	_dimensionAffectingProps['spacing']			= true;
	_dimensionAffectingProps['width']			= true;
	_dimensionAffectingProps['height']			= true;
	_dimensionAffectingProps['range']			= true;
	_dimensionAffectingProps['reverse']			= true;
	_dimensionAffectingProps['fontSize']		= true;
	_dimensionAffectingProps['fill']			= true;
    _dimensionAffectingProps['shadow']			= true;
	_dimensionAffectingProps['largeFont']			= true;
	_dimensionAffectingProps['smallFont']			= true;


	var delegatedProperties = [];
    delegatedProperties['fontFamily']		    = true;
    delegatedProperties['fill']		            = true;
    delegatedProperties['fontSize']		        = true;
    delegatedProperties['backgroundColor']		= true;
    delegatedProperties['textBackgroundColor']	= true;
    delegatedProperties['textDecoration']		= true;
    delegatedProperties['shadow']			    = true;



    /**
	 * Group class
	 * @class fabric.CurvedText
	 * @extends fabric.Text
	 * @mixes fabric.Collection
	 */
	fabric.CurvedText = fabric.util.createClass(fabric.Text, fabric.Collection, /** @lends fabric.CurvedText.prototype */ {
		/**
		 * Type of an object
		 * @type String
		 * @default
		 */
		//type: 'curvedText',
        type: 'curvedText',
		/**
		 * The radius of the curved Text
		 * @type Number
		 * @default 50
		 */
		radius: 180,

		range: 5,

		smallFont: 20,

		largeFont: 50,

		effect:'curved',

		/**
		 * Spacing between the letters
		 * @type fabricNumber
		 * @default 20
		 */
		spacing: 15,

//		letters: null,

		/**
		 * Reversing the radius (position of the original point)
		 * @type Boolead
		 * @default false
		 */
		reverse: false,

		/**
		 * List of properties to consider when checking if state of an object is changed ({@link fabric.Object#hasStateChanged})
		 * as well as for history (undo/redo) purposes
		 * @type Array
		 */
		stateProperties:      stateProperties,

		/**
		 * Properties that are delegated to group objects when reading/writing
		 * @param {Object} delegatedProperties
		*/
		delegatedProperties: delegatedProperties,

		/**
		 * Properties which when set cause object to change dimensions
		 * @type Object
		 * @private
		*/
		_dimensionAffectingProps: _dimensionAffectingProps,

		/**
		 * Added complexity
		 */
		complexity: function() {
			this.callSuper('complexity');
		},

		initialize: function(text, options) {
			options || (options = {});
			this.letters = new fabric.Group([], {selectable: false, padding: 0});
			this.__skipDimension = true;
			this.setOptions(options);
			this.__skipDimension = false;
			this.callSuper('initialize', options);
			this.setText(text);

		},
		setText: function(text) {
            if (this.letters) {
                while (text.length !== 0 && this.letters.size() >= text.length) {
                    this.letters.remove(this.letters.item(this.letters.size() - 1));
                }

                this.shadow=null;
                this.stroke=null;
                if(myEditor.currentShadowEffect=='shadow')
                {
                    this.shadow={color:myEditor.currentShadowColor,blur:1, offsetX:myEditor.shadowOffsetX, offsetY:myEditor.shadowOffsetY}
                }
                if(myEditor.currentOutlineEffect=='outline')
                {
                    this.stroke=myEditor.currentOutlineColor;
                    this.strokeWidth=myEditor.currentOutlineWidth;
                }


                for (var i = 0; i < text.length; i++) {
                    //I need to pass the options from the main options
                    if (this.letters.item(i) === undefined) {
                        this.letters.add(new fabric.Text(text[i]));
                    } else {
                        this.letters.item(i).setText(text[i]);
                    }
                    if(this.shadow!=null)
                    {
                        this.letters.item(i).set('shadow', this.get('shadow'));
                        this.letters.item(i).set('stroke', null);
                        this.letters.item(i).set('strokeWidth', null);
                    }
                    else if(this.stroke!=null)
                    {
                        this.letters.item(i).set('stroke', this.get('stroke'));
                        this.letters.item(i).set('strokeWidth', parseInt(myEditor.currentOutlineWidth));
                        this.letters.item(i).set('shadow', null);
                    }
                    console.log("color="+this.fill);
                    this.letters.item(i).set('fill',this.fill);


                    /**/

                }
                this.letters.set('fill',this.fill);
                this.letters.set('fontFamily',myEditor.currentFont);
                this.letters.set('fontSize',20);

            }
            this.callSuper('setText', text);



		},
        setStyle: function(activeObj, style, value) {

            this.callSuper('setStyle', activeObj, style, value);

        },
		_render: function(ctx) {
			if (this.letters) {
                var curAngle = 0,
                    angleRadians = 0,
                    align = 0;
                // Text align
                /*if(this.width!=0)
                 {
                 this.set('width',this.width);
                 this.set('height',this.height);
                 }	*/
                if (this.get('textAlign') === 'center' || this.get('textAlign') === 'justify') {
                    align = (this.spacing / 2) * (this.text.length - 1);
                } else if (this.get('textAlign') === 'right') {
                    align = (this.spacing) * (this.text.length - 1);
                }

                var width=0;

                this.letters.set('left', (width));
                this.letters.set('top', (0));
                this.letters.setAngle(0);
                this.letters.set('padding', 0);
                //if(this.effect=='curved' || this.effect=='arc' || this.effect=='arc' || this.effect=='STRAIGHT')
                /*for (var key in this.delegatedProperties) {
                    this.letters.set(key, this.get(key));
                }*/
                for (var i = 0, len = this.text.length; i < len; i++) {
					// Find coords of each letters (radians : angle*(Math.PI / 180)


                    //canvas.renderAll();

                    /*
                    if(this.shadow!=null)
                    {
                        this.letters.item(i).set('shadow', this.get('shadow'));
                        this.letters.item(i).set('stroke', null);
                        this.letters.item(i).set('strokeWidth', null);
                    }
                    else if(this.stroke!=null)
                    {
                        this.letters.item(i).set('stroke', this.get('stroke'));
                        this.letters.item(i).set('strokeWidth', this.get('strokeWidth'));
                        this.letters.item(i).set('shadow', null);
                    }
                    else
                    {
                        this.letters.item(i).set('stroke', null);
                        this.letters.item(i).set('strokeWidth', null);
                        this.letters.item(i).set('shadow', null);
                    }
                     */

                    if(this.effect=='curved')
                    {
                        var multiplier = this.reverse ? 1 : -1;
                        curAngle = (multiplier * -i * parseInt(this.spacing, 10)) + (multiplier * align);
                        angleRadians = curAngle * (Math.PI / 180);

                        this.letters.item(i).set('top', (multiplier * Math.cos(angleRadians) * this.radius));
                        this.letters.item(i).set('left', (multiplier * -Math.sin(angleRadians) * this.radius));

                        this.letters.item(i).setAngle(curAngle);
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set('selectable',false);

                    }
                    else if(this.effect=='arc')
                    {

                        var multiplier = this.reverse ? 1 : -1;
                        curAngle = (multiplier * -i * parseInt(this.spacing, 10)) + (multiplier * align);
                        angleRadians = curAngle * (Math.PI / 180);
                        this.letters.item(i).set('top', (multiplier * Math.cos(angleRadians) * this.radius));
                        this.letters.item(i).set('left', (multiplier * -Math.sin(angleRadians) * this.radius));

                        this.letters.item(i).setAngle(0);
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set('selectable',false);
                    }
                    else if(this.effect=='STRAIGHT')
                    {
                        //var newfont=(i*5)+15;
                        //this.letters.item(i).set('fontSize',(newfont));
                        this.letters.item(i).set('left', (width));
                        this.letters.item(i).set('top', (0));
                        this.letters.item(i).setAngle(0);
                        width+=this.letters.item(i).get('width');
                        this.letters.item(i).set('padding', 0);
                        this.letters.item(i).set({
                            borderColor: 'red',
                            cornerColor: 'green',
                            cornerSize: 6,
                            transparentCorners: false
                        });
                        this.letters.item(i).set('selectable',false);
                    }
					else if(this.effect=='smallToLarge')
					{

						var small = parseInt(this.smallFont);
						var large = parseInt(this.largeFont);
						//var small = 20;
						//var large = 75;
						var difference = large-small;
						var center = Math.ceil(this.text.length/2);
						var step = difference / (this.text.length );
						var newfont=small + (i*step);

						//var newfont=(i*this.smallFont)+15;

						this.letters.item(i).set('fontSize',(newfont));

						this.letters.item(i).set('left', (width));
						width+=this.letters.item(i).get('width');
						//this.letters.item(i).set('padding', 0);
						/*this.letters.item(i).set({
							borderColor: 'red',
							cornerColor: 'green',
							cornerSize: 6,
							transparentCorners: false
						});*/
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable',false);
                        this.letters.item(i).setAngle(0);
						this.letters.item(i).set('top', -1* this.letters.item(i).get('fontSize')+i);
						//this.letters.width=width;
						//this.letters.height=this.letters.item(i).get('height');

					}
					else if(this.effect=='largeToSmallTop')
					{

						var small = parseInt(this.largeFont);
						var large = parseInt(this.smallFont);
						//var small = 20;
						//var large = 75;
						var difference = large-small;
						var center = Math.ceil(this.text.length/2);
						var step = difference / (this.text.length );
						var newfont=small + (i*step);
						//var newfont=((this.text.length-i)*this.smallFont)+12;
						this.letters.item(i).set('fontSize',(newfont));
						this.letters.item(i).set('left', (width));
						width+=this.letters.item(i).get('width');
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set({
							borderColor: 'red',
							cornerColor: 'green',
							cornerSize: 6,
							transparentCorners: false
						});
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable',false);
						this.letters.item(i).top =-1* this.letters.item(i).get('fontSize')+(i/this.text.length);

					}
					else if(this.effect=='largeToSmallBottom')
					{

						var small = parseInt(this.largeFont);
						var large = parseInt(this.smallFont);
						//var small = 20;
						//var large = 75;
						var difference = large-small;
						var center = Math.ceil(this.text.length/2);
						var step = difference / (this.text.length );
						var newfont=small + (i*step);
						//var newfont=((this.text.length-i)*this.smallFont)+12;
						this.letters.item(i).set('fontSize',(newfont));
						this.letters.item(i).set('left', (width));
						width+=this.letters.item(i).get('width');
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set({
							borderColor: 'red',
							cornerColor: 'green',
							cornerSize: 6,
							transparentCorners: false
						});
						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable',false);
						//this.letters.item(i).top =-1* this.letters.item(i).get('fontSize')+newfont-((this.text.length-i))-((this.text.length-i));
						this.letters.item(i).top =-1* this.letters.item(i).get('fontSize')-i;
					}
					else if(this.effect=='bulge')
					{


						var small = parseInt(this.smallFont);
						var large = parseInt(this.largeFont);
						//var small = 20;
						//var large = 75;
						var difference = large-small;
						var center = Math.ceil(this.text.length/2);
						var step = difference / (this.text.length - center);
						if(i<center)
							var newfont=small + (i*step);
						else
							var newfont=large - ((i-center+1)*step);
						this.letters.item(i).set('fontSize',(newfont));

						this.letters.item(i).set('left', (width));
						width+=this.letters.item(i).get('width');

						this.letters.item(i).set('padding', 0);
						this.letters.item(i).set('selectable',false);

						this.letters.item(i).set('top',-1*this.letters.item(i).get('height')/2);



					}


				}

				// Update group coords

                //this.letters.set('fill', this.get('fill'));
                //this.letters.set('fontFamily', this.get('fontFamily'));

				this.letters._calcBounds();
				this.letters._updateObjectsCoords();
				this.letters.saveCoords();
//				this.letters.render(ctx);

				this.width = this.letters.width;
				this.height = this.letters.height;
                //console.log('End rendering');
                //this.set('fill','#000');


			}
            //console.log('this.fire('object:modified', { target: target });');
            //myEditor.changeFontColor(myEditor.currentFontColor);
            //myEditor.changeShadowColor(myEditor.currentShadowColor);
            //myEditor.changeFont(myEditor.currentFont);
            //myEditor.updateTextProps(this);

		},

		render: function(ctx, noTransform) {
			// do not render if object is not visible

			if (!this.visible) return;
			if (!this.letters) return;

			ctx.save();
			this.transform(ctx);

			var groupScaleFactor = Math.max(this.scaleX, this.scaleY);

			this.clipTo && fabric.util.clipContext(this, ctx);

			//The array is now sorted in order of highest first, so start from end.
			for (var i = 0, len = this.letters.size(); i < len; i++) {

				var object = this.letters.item(i),
					originalScaleFactor = object.borderScaleFactor,
					originalHasRotatingPoint = object.hasRotatingPoint;

				// do not render if object is not visible
				if (!object.visible) continue;

				object.borderScaleFactor = groupScaleFactor;
				object.hasRotatingPoint = false;

				object.render(ctx);

				object.borderScaleFactor = originalScaleFactor;
				object.hasRotatingPoint = originalHasRotatingPoint;
			}
			this.clipTo && ctx.restore();

			if (!noTransform && this.active) {
				this.drawBorders(ctx);
				this.drawControls(ctx);
			}
			ctx.restore();
			this.setCoords();
            /*var height=this.height;
				$.each(this.letters._objects, function(i,item){

					item.height=height;item.top=0;


				}); */
		},
		/**
		 * @private
		 */
		_set: function(key, value) {

			this.callSuper('_set', key, value);
			if (this.letters) {
			//Properties are delegated with the object is rendered
//				if (key in this.delegatedProperties) {
//					var i = this.letters.size();
//					while (i--) {
//						this.letters.item(i).set(key, value);
//					}
//				}
				if (key in this._dimensionAffectingProps) {
					this._initDimensions();
					this.setCoords();
				}
			}

		},
		toObject: function(propertiesToInclude) {
			var object = extend(this.callSuper('toObject', propertiesToInclude), {
				radius: this.radius,
				spacing: this.spacing,
				reverse: this.reverse,
				effect: this.effect,
				range: this.range,
				smallFont: this.smallFont,
				largeFont: this.largeFont
				//				letters: this.letters	//No need to pass this, the letters are recreated on the fly every time when initiated
			});
			if (!this.includeDefaultValues) {
				this._removeDefaultValues(object);
			}
			return object;
		},
		/**
		 * Returns string represenation of a group
		 * @return {String}
		 */
		toString: function() {
			return '#<fabric.CurvedText (' + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '", "radius": "' + this.radius + '", "spacing": "' + this.spacing + '", "reverse": "' + this.reverse + '" }>';
		},
		/* _TO_SVG_START_ */
		/**
		 * Returns svg representation of an instance
		 * @param {Function} [reviver] Method for further parsing of svg representation.
		 * @return {String} svg representation of an instance
		 */
		toSVG: function(reviver) {
			var markup = [
				'<g ',
				'transform="', this.getSvgTransform(),
				'">'
			];
			if (this.letters) {
				for (var i = 0, len = this.letters.size(); i < len; i++) {
					markup.push(this.letters.item(i).toSVG(reviver));
				}
			}
			markup.push('</g>');
			return reviver ? reviver(markup.join('')) : markup.join('');
		}
		/* _TO_SVG_END_ */
	});

	/**
	 * Returns {@link fabric.CurvedText} instance from an object representation
	 * @static
	 * @memberOf fabric.CurvedText
	 * @param {Object} object Object to create a group from
	 * @param {Object} [options] Options object
	 * @return {fabric.CurvedText} An instance of fabric.CurvedText
	 */
	fabric.CurvedText.fromObject = function(object) {
		return new fabric.CurvedText(object.text, clone(object));

	};

	fabric.util.createAccessors(fabric.CurvedText);

	/**
	 * Indicates that instances of this type are async
	 * @static
	 * @memberOf fabric.CurvedText
	 * @type Boolean
	 * @default
	 */
	fabric.CurvedText.async = false;

})(typeof exports !== 'undefined' ? exports : this);
