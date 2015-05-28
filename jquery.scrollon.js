/*
 * (c) 2015 Edouard J. Simon
 * 
 */
(function ($) {
    $.fn.scrollOn = function (options) {
        settings = $.extend({
            'nextSelector': 'a.next.pagelink:last',
            'contentSelector': 'li.resulthit',
            'error': function () {
                console.log('error');
            },
            'scrollStart': function (me) {
            },
            'scrollEnd': function (me) {
            }
        }, options);

        var currentNextLink = $(settings.nextSelector).attr('href');
        var me = this;
        $(window).scroll(function () {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                settings.scrollStart(me);
                $.get(currentNextLink, function (data) {
                    var elms = $(data).find(settings.contentSelector);
                    $(me).append(elms);
                    currentNextLink = $(data).find(settings.nextSelector).attr('href');
                    settings.scrollEnd(me);
                }).fail(function () {
                    settings.error();
                });
            }
        });
        return this;
    };
})(jQuery);
