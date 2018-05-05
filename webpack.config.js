const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const Compression = require('compression-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/index.tsx"
    },
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname + "/dist"),
        chunkFilename: "js/[name].[chunkhash].js",
        publicPath: '/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    devServer: {
        host: 'localhost',
        port: 3030,
        historyApiFallback: true,
        open: true,
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            //Css files loader
            { test: /\.css$/, loader: ['style-loader', 'css-loader'] },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "babel-loader" },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: { name: '[path][name].[ext]' }
            },
        ]
    },

    plugins: [
        // generate a index.html file in the dist folder.
        new HtmlWebpackPlugin({
            template: "index.html",
            favicon: "./favicon.ico"
        }),
        // Add links to css files from blueprint
        new HtmlIncludeAssetsPlugin({
            assets: [],
            append: true
        }),
        // Generate .gz compressed files for better performances
        new Compression(),
        // Copy assets into the dist directory. Identical path means assets from the root folder are moved to the dist folder.
        new CopyWebpackPlugin([
            {
                from: "./manifest.json",
                to: "./manifest.json"
            },
            {
                from: "./favicon.ico",
                to: "./favicon.ico"
            }
        ])
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2,
                    minSize: 0
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    enforce: true,
                    priority: 5
                },
                react: {
                    test: /[\\/](react*)[\\/]/,
                    name: "react",
                    chunks: "all",
                    enforce: true,
                    priority: 10
                }
            }
        }
    }
};