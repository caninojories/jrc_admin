+function( $ ) { "use strict";

  var layout = function (SidebarWidth) {
    this.jcaSideBarWidth = SidebarWidth
    return this;
  }

  layout.prototype.init = function () {
    console.log("HASH: " + window.location.href.split('#')[0])
    console.log('++++++++++ Starting Init... +++++++++++++')
    this.sidebar('#sidebarOnandOff')
    this.links()

    $('.carousel').carousel({
      interval: 3000,
      pause: "hover",
      wrap: true
    })

    return this;
  }

  layout.prototype.sidebar = function (element) {
    console.log('++++++++ Starting sidebar... +++++++++++')
    $(element).on('click', function () {
      console.log('+++++++ Initiating sidebarClick Event +++++++')
      if( $('#wrapper').hasClass('sidebarOn') ) {
        $('#wrapper').addClass('sidebarOff')
        $('#wrapper').removeClass('sidebarOn')
      } else {
        $('#wrapper').addClass('sidebarOn')
        $('#wrapper').removeClass('sidebarOff')
      }

    })
  }

  layout.prototype.links = function () {
    console.log('+++++++ links ++++++++')
    //delete the links added in the header
    //then add the links
    var links;
    if(window.location.href.indexOf('database') > 0) {
      links = $('body link').detach()
      $('.paragala').remove();
      $('head').append(links)
    } else {
      $('.database').remove();
    }

    if(window.location.href.indexOf('paragala') > 0) {
      links = $('body link').detach()
      $('head').append(links)
    } else {
      $('.paragala').remove();
    }

    if(window.location.href.indexOf('questions') > 0) {
      links = $('body link').detach()
      $('.paragala').remove();
      $('head').append(links)
    } else {
      $('.questions').remove();
    }

  }

  var sideBarWidth = 200
  window.jcaLayout = new layout(sideBarWidth);
  $(document)
    .on('load', jcaLayout.init())

}( jQuery )
