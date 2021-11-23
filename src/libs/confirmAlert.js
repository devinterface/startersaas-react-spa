import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class ConfirmAlert {
  success (message) {
    confirmAlert({
      message: message,
      buttons: [
        {
          label: 'OK',
          onClick: () => { }
        }
      ]
    })
  }

  error (message) {
    confirmAlert({
      message: message,
      buttons: [
        {
          label: 'OK',
          onClick: () => { }
        }
      ]
    })
  }
}

export default new ConfirmAlert()
