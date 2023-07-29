$(document).ready(function () {
    /** toggle */
    let isCollapse = false
    let boxWidth = 280;
    $("#sidebar-toggle").click(function () {
        if (!isCollapse) {
            $("#submenu").fadeOut(120);
            $("#wrapper").animate({
                width: 0
            });
            isCollapse = !isCollapse
        } else {
            $("#submenu").fadeIn(1000);
            $("#wrapper").animate({
                width: boxWidth
            });
            isCollapse = !isCollapse
        }
    });


    /** change item color for current url*/
    let currentUrl = $("#current-url").text().split("?")[0]
    $("#submenu a").each(function (i, el) {
        if (el.href === currentUrl) {
            $(el).addClass("main-color")
            $(el).closest('div.collapse').addClass('show')
            $(el).closest('li.item').children('div.item').children('h6').addClass('main-color')
            $(el).closest('li.item').children('div.item').children('h6').children('svg').addClass('main-color')
            $(el).closest('li.item').children('div.item').children('h6').children('.d').addClass('d-none')
            $(el).closest('li.item').children('div.item').children('h6').children('.e').removeClass('d-none')
        }
    });

    /** for singe items */
    $("#submenu a").each(function (i, el) {
        if (el.href === currentUrl) {
            $(el).addClass("main-color")
            $(el).closest('div.collapse').addClass('show')
            $(el).children('h6').addClass('main-color')
            $(el).children('h6').children('.d').addClass('d-none')
            $(el).children('h6').children('.e').removeClass('d-none')
        }
    });


    /** change sub menus */
    currentUrl = currentUrl.replace('customer_', '')
    console.log(currentUrl)
    let url = currentUrl.split('/')

    let founded = false
    $(".submenu").each(function (el) {

        let class_ = this.className
        class_ = class_.replace('submenu d-none', '')
        class_ = class_.replace('-sub', '')
        class_ = class_.replace(' ', '')
        $(this).slideUp()
        if (url.includes(class_)) {
            founded = true
            $(this).removeClass('d-none')

            let name = "." + class_ + "-sub"
            //$(name).fadeOut(0)
        }
    });

    // remove sub sidebar if doesn't exist
    if (founded) {
        console.log('...................')
        $("#wrapper").animate({
            width: boxWidth
        });
    } else {
        isCollapse = true
        $("#wrapper").width(0);
    }


    $(".menu").each(function () {
        let class_ = this.className
        class_ = class_.replace('nav-item mt-4 menu row ', '')
        subMenu(class_, class_ + "-sub")
    });

    function subMenu(menuClass, submenuClass) {
        let time = 200;
        $("." + menuClass).click(function () {
            $(".submenu").each(function () {
                console.log(this.className.includes(submenuClass))
                if (this.className.includes(submenuClass)) {
                    if (isCollapse) {

                        $("#wrapper").removeClass('d-none');
                        $("#wrapper").animate({
                            width: boxWidth
                        });
                        isCollapse = !isCollapse
                    }
                    //console.log(class_)
                    $(this).removeClass('d-none')
                    //$("." + class_).removeClass('d-none');
                } else {
                    //console.log(class_+"............")
                    $(this).addClass('d-none')
                }

            });
        });
    }

    //$("#wrapper").removeClass('d-none')

});

