// https://nuxt.com/docs/api/configuration/nuxt-config

import * as https from "https";

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            url: '#'
        }
    },


    css: [
        '@/public/css/index.css',
        '@/public/css/bootstrap.rtl.min.css',
        '@/public/css/font.css',
        '@/public/fontawesome/css/all.css',
        '@/public/css/mds.bs.datetimepicker.style.css',
        '@/public/css/owl.carousel.min.css',
        '@/public/css/vru_site.css',
        '@/public/css/style.css',
        '@/public/css/clockpicker.min.css',
    ],
    app: {
        head: {
            htmlAttrs: {
                dir: 'rtl'
            },
            script: [
                {
                    src: '/js/bootstrap.bundle.min.js',
                },
                {
                    src: '/js/mds.bs.datetimepicker.js',
                },
                {
                    src: '/js/num2persian-min.js',
                },
                {
                    src: '/js/jquery-3.6.0.min.js',
                },
                {
                    src: '/js/ckeditor.js',
                },
                {
                    src: '/js/owl.carousel.min.js',
                },
                {
                    src: '/js/clockpicker.min.js',
                },
            ]
        }
    },

})
