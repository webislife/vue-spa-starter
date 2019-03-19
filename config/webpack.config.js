/**
 * Main builder dependies
 */
const
    VueLoaderPlugin = require('vue-loader/lib/plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    sassVars = require('./../src/sass/_context'),
    path = require('path'),
    webpack = require('webpack'),
    appConf = require('./app.env.conf.js'),
    releaseTime = Date.now(),
    styleLoader = [
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                parser: 'postcss-comment',
                plugins: [
                    require('css-mqpacker'),
                    require('cssnano')({
                        discardComments: {
                            removeAll: true
                        },
                    }),
                ]
            }
        },
        {
            loader: 'sass-loader',
            options: {
                data: Object.keys(sassVars).map(key => '$' + key + ": " + '"' + sassVars[key] + '";').join(" "),
            }
        },
        {
            loader: 'sass-resources-loader',
            options: {
                resources: path.resolve(__dirname, "./../src/sass/_context.scss"),
            }
        }
    ],
    sassLoader = [
        'vue-style-loader',
        ...styleLoader
    ],
    sassFileLoader = [
        {
            loader: 'file-loader',
            options: {
                name: 'css/[name].css'
            }
        },
        'extract-loader',
        ...styleLoader
    ],
    webpackPlugins = [
        new webpack.HotModuleReplacementPlugin({ multiStep: true }),
        new VueLoaderPlugin(),
        //Forward config into application
        new webpack.DefinePlugin({
            'appConf': JSON.stringify(Object.assign({releaseTime}, appConf))
        }),
        new webpack.ProvidePlugin({
            'axios': 'axios',
            "Vue": ['vue/dist/vue.esm.js', 'default'],
            "Vuex": ['vuex/dist/vuex.esm.js', 'default'],
            "mapState": ['vuex/dist/vuex.esm.js', 'mapState'],
            "mapGetters": ['vuex/dist/vuex.esm.js', 'mapGetters'],
            "mapMutations": ['vuex/dist/vuex.esm.js', 'mapMutations'],
            "mapActions": ['vuex/dist/vuex.esm.js', 'mapActions'],
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
    ];

if (appConf.NODE_ENV === 'production') {
    webpackPlugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'webpack-report.html',
            openAnalyzer: false,
            generateStatsFile: true,
            statsFilename: 'webpack-stats.json'
        })
    );
}
const webpackconfig = {
    mode: appConf.NODE_ENV,
    devtool: appConf.WATCH === 1 ? 'inline-source-map' : false,
    entry: {
        index: path.resolve(__dirname, './../src/js/app.js'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: "[name].js?" + releaseTime,
        path: path.resolve(__dirname, appConf.DIST),
        publicPath: appConf.PUBLIC_PATH,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: [
                                'babel-loader',
                            ],
                            scss: sassLoader
                        }
                    }
                }
            },
            {
              test: /\.svg$/,
              loader: 'svg-sprite-loader',
              options: {
                symbolId: filePath => path.basename(filePath)
              }
            },
            {
                test: /\.scss$/,
                use: sassLoader
            },
            {
                test: /\.sassfile$/,
                use: sassFileLoader
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: 'ts-loader'
            },
        ]
    },
    optimization: {
        runtimeChunk: false,
    },
    stats: (appConf.WATCH === 1) ? "errors-only" : { colors: true, hash: false, timings: true, assets: true, chunks: true, chunkModules: true, modules: true, children: true, cached: false, depth: true, usedExports: true, source: false },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './../src'),
            '@js': path.resolve(__dirname, './../src/js'),
            '@sass': path.resolve(__dirname, './../src/sass'),
            '@store': path.resolve(__dirname, './../src/js/store/modules')
        },
    },
    plugins: webpackPlugins,
    devServer: {
        contentBase: path.join(__dirname, './../dist'),
        port: 8081,
        host: '0.0.0.0',
        hot: true,
        compress: false,
        historyApiFallback: true,
    },
    watchOptions: {
        aggregateTimeout: 250,
        ignored: /node_modules/
    }
};

module.exports = webpackconfig;
