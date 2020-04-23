const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(staticPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather!',
    name: 'Rishabh'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Rishabh'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Please help me!',
    name: 'Rishabh'
  });
});

app.get('/weather', (req, res) => {
  const {
    address
  } = req.query;
  if (!address) {
    return res.send({
      error: 'No address query found'
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({
          error
        });
      }
      console.log(data);
      res.send({
        location,
        description: data.weather_descriptions[0],
        temperature: data.temperature,
        feelsLike: data.feelslike
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found!',
    name: 'Rishabh'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found!',
    name: 'Rishabh'
  });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});