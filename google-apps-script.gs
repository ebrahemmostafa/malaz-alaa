const SHEET_NAME = 'Song Suggestions';
const HEADERS = ['id', 'song', 'timestamp', 'submittedAt', 'userAgent'];

function doGet(e) {
  const params = (e && e.parameter) || {};
  const action = params.action || 'list';

  if (action !== 'list') {
    return output_({ ok: false, error: 'Unknown action' }, params.callback);
  }

  return output_({ ok: true, songs: listSongs_() }, params.callback);
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const action = params.action || 'add';

  if (action !== 'add') {
    return output_({ ok: false, error: 'Unknown action' });
  }

  const song = String(params.song || '').trim();
  if (!song) {
    return output_({ ok: false, error: 'Missing song' });
  }

  const timestamp = Number(params.timestamp) || Date.now();
  const row = [
    Utilities.getUuid(),
    song,
    timestamp,
    new Date(timestamp).toISOString(),
    String(params.userAgent || '')
  ];

  getSheet_().appendRow(row);
  return output_({ ok: true });
}

function listSongs_() {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  return sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues()
    .filter(row => row[1])
    .map(row => ({
      id: String(row[0]),
      song: String(row[1]),
      timestamp: Number(row[2]) || Date.parse(row[3]) || Date.now()
    }));
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  const currentHeaders = headerRange.getValues()[0];
  const needsHeaders = HEADERS.some((header, index) => currentHeaders[index] !== header);
  if (needsHeaders) {
    headerRange.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function output_(payload, callback) {
  const json = JSON.stringify(payload).replace(/</g, '\\u003c');
  const callbackName = String(callback || '');
  const isJsonp = /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callbackName);

  if (isJsonp) {
    return ContentService
      .createTextOutput(`${callbackName}(${json});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
