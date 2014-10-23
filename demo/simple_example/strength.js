/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 *
 *
 * Modified for use to be based upon number of unique words in a element.
 */
(function ($, window, document, undefined) {

    var pluginName = "strength",
        defaults = {
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            threshHolds: [5, 10, 15],
            unique: false
        };

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function () {

            /**
             * Check the strength of an item.
             * @param element_id
             */
            function check_strength(element_id, threshHolds, unique) {

                var thisval = $('#' + element_id).val();
                var word_count = 0;

                // Get the word count
                var word_count_array = thisval.match(/\S+/g);

                if (word_count_array) {

                    // Build a unique set of words.
                    var unique_words = [];
                    for (var i = 0; i < word_count_array.length; i++) {
                        if (unique === false || $.inArray(word_count_array[i], unique_words) === -1) {
                            unique_words.push(word_count_array[i]);
                        }
                    }
                    word_count = unique_words.length;
                }

                // Determine which class to apply.
                get_class(thisid, word_count, threshHolds);
            }

            function get_class(thisid, word_count, threshHolds) {

                // Two elements one for the meter to before the element
                var thismeter = $('div[data-meter="' + thisid + '"]');
                // Another for the text describing it.
                var thistext = $('p[data-meter-text="' + thisid + '"]');

                // Based on word count determine what to show.
                var strengthClass = 'veryweak';
                var strengthText = 'Very weak';
                if (word_count > threshHolds[0] && word_count < threshHolds[1]) {
                    strengthClass = 'weak';
                    strengthText = 'Weak';
                } else if (word_count >= threshHolds[1] && word_count < threshHolds[2]) {
                    strengthClass = 'medium';
                    strengthText = 'Medium';
                } else if (word_count >= threshHolds[2]) {
                    strengthClass = 'strong';
                    strengthText = 'Strong';
                }

                var thisval = $('#' + thisid).val();

                if (thisval === undefined || thisval.length === 0) {
                    // If there is no value then clear it.
                    thismeter.removeClass();
                    thistext.html('');
                } else {

                    // Remove any class from the meter
                    thismeter.removeClass();
                    thismeter.addClass(strengthClass);

                    // Add the text describing the strength
                    thistext.html(strengthText);
                }
            }

            // Give the element a unique id.
            var thisid = this.$elem.attr('id');
            if (!thisid) {
                thisid = new Date().getTime();
            }
            this.$elem.attr('id', thisid);

            var threshHolds = this.options.threshHolds;
            if (threshHolds.length != 3) {
                threshHolds = this.defaults.threshHolds;
            }
            var unique = this.options.unique;

            // Add the strength class and the elements that need to go before it.
            this.$elem.addClass(this.options.strengthClass)
                .before('<div class="' + this.options.strengthMeterClass + '"><div data-meter="' + thisid + '"></div><p data-meter-text="' + thisid + '"></p></div>');

            // Bind to the keyup and keydown.
            this.$elem.bind('keyup keydown', function () {
                check_strength(thisid, threshHolds, unique);
            });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);


