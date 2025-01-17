/* Copyright Yahoo, Licensed under the terms of the Apache 2.0 license. See LICENSE file in project root for terms. */

import $ from 'jquery';
import connectid from '../connectid';

const LOCALSTORAGE_KEY = 'yahoo-connectid';
const LOCALSTORAGE_KEY_DEMO = 'yahoo-connectid-demo';

const GDPR_CONSENT_ALLOWED = 'CPdBusAPdBusAAOACBENCYCoAP_AAH_AACiQIlNd_X__bX9n-_7_6ft0cY1f9_r3ruQzDhfFs-8F3L_W_LwX32E7NF36pq4KmR4ku1bBIQFtHMnUDUmxaolVrzHsak2cpyNKI7JkknsZe2dYGF9Pn9lD-YKZ7_5_9_f52T_9_9_-39z3_9f___dt_-__-vjfV599n_v9fV_789Kf9____-_-___4IQQ_AJMNW4gC7EscCbQMIoQQIwrCQqAUAEFAMLRBYAODgp2VgEusIWACAVARgRAgxBRgwCAAACAJCIAJACwQCIAiAQAAgARAIQAETAILACwMAgABANCxACgAECQgyICI5TAgIgSCglsrEEoK9DTCAOssAKBRGxUACJAABSAgJCwcAwBICXCyQJMULwAw0AGAAIIlCIAMAAQRKFQAYAAgiUA';
const GDPR_CONSENT_NOTALLOWED = 'CPdIUkAPdIUkAAOACCENCaCgAAAAAAAAACiQAAAAAABhoAMAAQRKEQAYAAgiUKgAwABBEoA';

let localStorageDataJson = '';

const setPrivacyPreferences = (local, usp, gdpr) => {
  window.localStorage.removeItem('connectIdOptOut');
  delete window.__tcfapi;
  delete window.__uspapi;

  if (local !== 'unavailable') {
    window.localStorage.setItem('connectIdOptOut', local === 'allowed' ? '0' : '1');
  }

  if (usp !== 'unavailable') {
    const uspString = usp === 'does_not_apply' ?
      '1---' :
      usp === 'allowed' ?
        '1YNN' :
        '1YYN';
    window.__uspapi = (command, version, callback) => {
      callback({uspString}, true);
    };
  }

  if (gdpr !== 'unavailable') {
    const gdprApplies = gdpr !== 'does_not_apply';

    window.__tcfapi = (command, version, callback) => {
      let response = {
        eventStatus: 'tcloaded',
        gdprApplies,
      };
      if (gdprApplies) {
        const tcString = !gdprApplies ?
          undefined :
          gdpr === 'allowed' ?
            GDPR_CONSENT_ALLOWED :
            GDPR_CONSENT_NOTALLOWED;
        const purpose1 = !gdprApplies ?
          undefined :
          gdpr === 'allowed';

        response.tcString = tcString;
        response.purpose = {
          consents: {
            '1': purpose1,
          },
        };
      }
      callback(response, true);
    };
  }
}

const renderLocalStorageData = () => {
  const json = window.localStorage.getItem(LOCALSTORAGE_KEY);
  localStorageDataJson = json;
  const data = JSON.stringify(JSON.parse(json));
  $('#localStorageData').text(data);
};

const callGetIds = () => {
  const demoState = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY_DEMO) || '{}');
  document.getElementById('pixelId').value = demoState.pixelId || '';
  document.getElementById('email').value = demoState.email || '';
  document.getElementById('puid').value = demoState.puid || '';
  document.getElementById('privacy_local').value = demoState.privacyLocal;
  document.getElementById('privacy_usp').value = demoState.privacyUsp;
  document.getElementById('privacy_gdpr').value = demoState.privacyGdpr;

  setPrivacyPreferences(demoState.privacyLocal, demoState.privacyUsp, demoState.privacyGdpr);

  // get ids from yahoo-connectid module
  connectid.getIds(
    demoState,
    ids => {
      document.getElementById('getIdsResponse').innerHTML = `${JSON.stringify(ids, null, 2)}`;
    });
};

(() => {
  document.getElementById('execute').onclick = evt => {
    const pixelId = document.getElementById('pixelId').value;
    const email = document.getElementById('email').value;
    const puid = document.getElementById('puid').value;
    const privacyLocal = document.getElementById('privacy_local').value || 'does_not_apply';
    const privacyUsp = document.getElementById('privacy_usp').value || 'does_not_apply';
    const privacyGdpr = document.getElementById('privacy_gdpr').value || 'does_not_apply';
    window.localStorage.setItem(LOCALSTORAGE_KEY_DEMO, JSON.stringify({
      pixelId,
      email,
      puid,
      privacyLocal,
      privacyUsp,
      privacyGdpr
    }));

    callGetIds();
  };

  document.getElementById('reset').onclick = evt => {
    window.localStorage.removeItem(LOCALSTORAGE_KEY);
    const pixelId = document.getElementById('pixelId').value;
    window.localStorage.setItem(LOCALSTORAGE_KEY_DEMO, JSON.stringify({
      pixelId,
      privacyLocal: 'unavailable',
      privacyUsp: 'does_not_apply',
      privacyGdpr: 'does_not_apply',
    }));
    callGetIds();
  };

  setInterval(renderLocalStorageData, 250);
  callGetIds();
})();
