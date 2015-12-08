angular.module('barberApp')

.controller('homeCtrl', function($scope, $rootScope, $state) {

  /*
___________________________$$______________
 _________________________$$$$_____________
 _______________________$$$$$$_____________
 ______________________$$$$$$______________
 ______________________$$$$________________
 ______________________$$__________________
 _________$$$$$$$$$$$$$_$$$$$$$$$$$$$______
 ______$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$___
 ____$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$__
 ___$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$____
 __$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$______
 _$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_______
 _$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$________
 _$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$________
 _$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_______
 __$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$______
 ___$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$____
 ____$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_
 _____$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$__
 ______$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$___
 ________$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_____
 __________$$$$$$$$$$$$$$$$$$$$$$$$$_______
 ____________$$$$$$$$$$$$$$$$$$$$$_________
 ______________$$$$$$$$__$$$$$$$___________
*/

  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });

  /*
___________________________$$______________
 _________________________$$$$_____________
 _______________________$$$$$$_____________
 ______________________$$$$$$______________
 ______________________$$$$________________
 ______________________$$__________________
 _________$$$$$$$$$$$$$_$$$$$$$$$$$$$______
 ______$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$___
 ____$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$__
 ___$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$____
 __$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$______
 _$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_______
 _$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$________
 _$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$________
 _$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_______
 __$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$______
 ___$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$____
 ____$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_
 _____$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$__
 ______$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$___
 ________$$$$$$$$$$$$$$$$$$$$$$$$$$$$$_____
 __________$$$$$$$$$$$$$$$$$$$$$$$$$_______
 ____________$$$$$$$$$$$$$$$$$$$$$_________
 ______________$$$$$$$$__$$$$$$$___________
*/

  window.Instagram = {
    /**
     * Store application settings
     */
    config: {},

    BASE_URL: 'https://api.instagram.com/v1',

    init: function(opt) {
      opt = opt || {};

      this.config.client_id = opt.client_id;
    },

    /**
     * Get a list of popular media.
     */
    popular: function(callback) {
      var endpoint = this.BASE_URL + '/tags/barbershop/media/recent?client_id=' + this.config.client_id;
      this.getJSON(endpoint, callback);
    },

    /**
     * Get a list of recently tagged media.
     */
    tagsByName: function(name, callback) {
      var endpoint = this.BASE_URL + '/users/' + name + '/media/recent?client_id=' + this.config.client_id;
      this.getJSON(endpoint, callback);
    },

    getJSON: function(url, callback) {
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(response) {
          if (typeof callback === 'function') callback(response);
        }
      });
    }
  };

  Instagram.init({
    client_id: 'eddddbf3427f4188bc99abda72ab10ce'
  });

  $(document).ready(function() {

    Instagram.popular(function(response) {
      var $instagram = $('#instagram');
      for (var i = 0; i < 6; i++) {
        imageUrl = response.data[i].images.low_resolution.url;
        $instagram.append('<img src="' + imageUrl + '" />');
      }
    });

    $('#form').on('submit', function(e) {
      e.preventDefault();

      var tagName = $('#search').val();
      Instagram.tagsByName(tagName, function(response) {
        var $instagram = $('#instagram');
        $instagram.html('');

        for (var i = 0; i < response.data.length; i++) {
          imageUrl = response.data[i].images.low_resolution.url;
          $instagram.append('<img src="' + imageUrl + '" />');
        }
      });

    });

  });

});