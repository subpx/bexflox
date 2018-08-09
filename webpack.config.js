const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		extensions: ['.js', '.html']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
        exclude: /node_modules\/(?!@ctm)/,
        use: [
          {
            loader: 'svelte-loader',
            options: {
              skipIntroByDefault: true,
              nestedTransitions: true,
              emitCss: false,
              hotReload: true
            }
          }
        ]
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			},
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
		]
	},
	mode,
	plugins: [
    new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
    new webpack.ContextReplacementPlugin(
      /src\/[^/]*\/docs\/$/
    )
	],
	devtool: prod ? false: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    compress: true,
    port: 3001,
    historyApiFallback: true
  },
};
