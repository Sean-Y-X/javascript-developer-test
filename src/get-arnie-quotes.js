const { httpGet } = require('./mock-http-interface');

const SUCCESS_STATUS = 200;
const QUOTE_KEY = Object.freeze({
  ARNIE_QUOTE: 'Arnie Quote',
  FAILURE: 'FAILURE',
});

const fetchArnieQuote = async (url) => {
  try {
    const { status, body } = await httpGet(url);
    const message = JSON.parse(body).message;

    return status === SUCCESS_STATUS
      ? { [QUOTE_KEY.ARNIE_QUOTE]: message }
      : { [QUOTE_KEY.FAILURE]: message };
  } catch (error) {
    console.error(`Failed to fetch quote from ${url}`, error);
    return { [QUOTE_KEY.FAILURE]: `Failed to fetch quote` };
  }
};

const getArnieQuotes = async (urls) => {
  const promises = urls.map(fetchArnieQuote);

  return Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
