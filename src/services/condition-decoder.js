import moment from "moment";

export default {
  methods: {
    getCondition: (code) => {
      switch (code) {
        case 1:
          return { color: '#4756d5', text: '10/10' }
        case 2:
          return { color: '#00C853', text: '9/10' }
        case 3:
          return { color: '#FFAB00', text: '8/10' }
        case 4:
          return { color: '#E53935', text: '7/10' }
        default:
          return { color: '#00C853', text: '9/10' }
      }
    },
    numberWithCommas: (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    getCreatedDate: (dateTime) => {
      var options = { month: 'short', day: 'numeric' };
      const date = new Date(dateTime)
      const month = new Intl.DateTimeFormat('ru-RU', options).format(date)
      return month;
    },
    formatPhoneNumber: (phoneNumberString) => {
      var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
      var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }
      return null;
    },
    formatDate(value) {
      if (value) {
        return moment.utc(String(value)).local().locale("ru").format("D MMM HH:mm");
      }
    },
    formatDateDay(value) {
      if (value) {
        return moment.utc(String(value)).local().locale("ru").format("D MMM");
      }
    },
    fromNow(value) {
      if (value) {
        return moment.utc(String(value)).local().locale("ru").fromNow();
      }
    }
  }
}