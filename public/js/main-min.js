$(".main-header.logged-in .hotels-logo").after('<span class="toggle"><img src="../img/toggle.svg" alt="Menu" /></span>'),$(".main-header.logged-in .toggle").click((function(){$(".site-menu").toggleClass("open"),$(this).toggleClass("open")})),$("a.nested").click((function(e){$(this).hasClass("open")||($(this).addClass("open"),e.preventDefault())})),$(".intro-banner nav").before('<span class="toggle">Section Menu</span>'),$(".intro-block .toggle").click((function(){$(".intro-banner > nav").toggleClass("open"),$(this).toggleClass("open")})),$(".topics").before('<span class="topics-toggle">Topics</span>'),$(".topics-toggle").click((function(){$(".topics").toggleClass("open"),$(this).toggleClass("open")})),$(".filter-toggle").click((function(){$(".search-filters").toggleClass("open"),$(this).toggleClass("open")})),$(".topics li a, .search-filters li a, .topics.sub-filter li a").click((function(){return $(this).toggleClass("selected"),!1})),$(".search-filters li a.articles, .search-filters li a.blog-posts").click((function(){return $(".topics.sub-filter").toggleClass("open"),!1})),$(".viewer-menu .toggle").click((function(){$(".viewer-menu ul").toggleClass("open")})),$(".intro-block .toggle").click((function(){$(".news .intro nav").toggleClass("open"),$(this).toggleClass("open")})),$(".search-block section h3").click((function(){$(this).parent().toggleClass("open")})),$(".browser .year > h3").click((function(){$(this).parent().toggleClass("open")})),$(".months li > h3").click((function(){$(this).parent().toggleClass("open")})),$(".share-links h4").click((function(){$(this).parent().toggleClass("open")})),$(".months li h3").click((function(){$(this).parent().toggleClass("open")})),$(".collapsible h3").click((function(){$(this).parent().toggleClass("open")})),$("#create-new").click((function(){$(".app-pane.hidden").removeClass("hidden")})),$("button.remove").click((function(){return $(this).addClass("clicked"),$(this).parent().addClass("remove"),$(this).parent().mouseleave((function(){$(this).parent().removeClass("remove"),$(this).removeClass("clicked")})),!1})),$(".files li label").click((function(){$(this).parent().toggleClass("selected")})),$(".send-email").click((function(){return $(".send-panel").removeClass("hidden"),!1})),$("#new-stay").click((function(){$("#extended-stay-1").removeClass("hidden")})),$(".collapsible.detail-block h4").click((function(){$(this).parent().toggleClass("open")})),$(".stay-heading").click((function(){$(".stay-contents").toggleClass("hidden"),$(this).toggleClass("collapsed")})),$("button.save").click((function(){$(this).toggleClass("saved")})),$(".history-and-notes .add").click((function(){$("#add-note").removeClass("hidden")})),$("a.advanced-link").click((function(){$("#main-search .filters").addClass("advanced-search-open"),$(".advanced-search").removeClass("hidden"),$(this).addClass("hidden")})),$("#temp-stay-yes").click((function(){$("#stay_radios").removeClass("last-child-hack"),$(".actual-stay-dates").removeClass("hidden"),$(".actual-stay-dates").addClass("last-child-hack"),$(".narrative").addClass("hidden")})),$("#temp-stay-no").click((function(){$("#stay_radios").removeClass("last-child-hack"),$(".actual-stay-dates").addClass("hidden"),$(".narrative").removeClass("hidden")})),$("a.more-history").click((function(){return $(this).addClass("hidden"),$("#show-full-target").removeClass("hidden"),$("#hide-full-history").removeClass("hidden"),!1})),$("a.show-table-controls").click((function(){return $(".table-controls-panel").removeClass("hidden"),$(this).addClass("hidden"),!1})),$("#unread-toggle").click((function(){$("#unread-toggle").toggleClass("unread"),$("#unread-target-row").toggleClass("unread")})),$("#unread-all-toggle").click((function(){$("#unread-all-toggle").addClass("unread"),$("#unread-toggle").addClass("unread"),$("tr").addClass("unread")})),$(".dialog-content button.close").click((function(){$(".dialog").addClass("hidden")}));