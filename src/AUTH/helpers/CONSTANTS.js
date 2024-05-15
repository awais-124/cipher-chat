import ICONS from './icons';
import ASSETS from './imports';

const Six = Array(6).fill(0);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPLASH_TIMEOUT = 5000;
const KeyPad = [
  {alpha: '', num: '1'},
  {alpha: 'ABC', num: '2'},
  {alpha: 'DEF', num: '3'},
  {alpha: 'GHI', num: '4'},
  {alpha: 'JKL', num: '5'},
  {alpha: 'MNO', num: '6'},
  {alpha: 'PQRS', num: '7'},
  {alpha: 'TUV', num: '8'},
  {alpha: 'WXYZ', num: '9'},
];

const NumericButtons = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'CL',
  '0',
  'x',
];

const signUpData = {
  name: '',
  phone: '',
  email: '',
  password: '',
  birthday: '',
};

const ModalMessage = {
  forgotPass: "The username you have entered doesn't belong to any account!",
  resetPass: 'Your password has been reset successfully!',
  signUpPin: 'Yay! Your PIN code has been created. Continue to B-Wallet!',
};

const SignUpScreenBtnLabels = [
  'Name',
  'Phone Number',
  'Email Address',
  'Password',
];

const HomeShortcut = [
  {text: 'Internet', icon: ICONS.INTERNET},
  {text: 'Gold', icon: ICONS.GOLD},
  {text: 'Electricity', icon: ICONS.ELECTRICITY},
  {text: 'Others', icon: ICONS.OTHERS},
];

const Card = [
  {
    id: 1,
    h1: 'Doorprice Handphone',
    h2: 'Get coupons now',
    src: ASSETS.DummySmall,
  },
  {
    id: 2,
    h1: 'Doorprice Handphone',
    h2: 'Get coupons now',
    src: ASSETS.DummySmall,
  },
  {
    id: 3,
    h1: 'Doorprice Handphone',
    h2: 'Get coupons now',
    src: ASSETS.DummySmall,
  },
  {
    id: 4,
    h1: 'Doorprice Handphone',
    h2: 'Get coupons now',
    src: ASSETS.DummySmall,
  },
];

const Articles = [
  {
    id: 1,
    heading: 'Lorem ipsum dolor',
    detail: 'Lorem ipsum dolor sedulur gas',
    src: ASSETS.DummyLarge,
  },
  {
    id: 2,
    heading: 'Lorem ipsum dolor',
    detail: 'Lorem ipsum dolor sedulur gas',
    src: ASSETS.DummyLarge,
  },
  {
    id: 3,
    heading: 'Lorem ipsum dolor',
    detail: 'Lorem ipsum dolor sedulur gas',
    src: ASSETS.DummyLarge,
  },
  {
    id: 4,
    heading: 'Lorem ipsum dolor',
    detail: 'Lorem ipsum dolor sedulur gas',
    src: ASSETS.DummyLarge,
  },
];

const BottomNav = [
  {
    title: 'Home',
    icon: ICONS.HOME,
  },
  {
    title: 'CashFlow',
    icon: ICONS.CASHFLOW,
  },
  {
    title: '',
    icon: null,
  },
  {
    title: 'Message',
    icon: ICONS.MESSAGE,
  },
  {
    title: 'Profile',
    icon: ICONS.PROFILE,
  },
];

const QuickActions = [
  {
    id: 1,
    text: 'Top Up',
    src: ICONS.TOPUP,
  },
  {
    id: 2,
    text: 'Send',
    src: ICONS.SEND,
  },
  {
    id: 3,
    text: 'Request',
    src: ICONS.REQUEST,
  },
];

const Notifs = [
  {
    detail: 'Promo 40% Discount for special day in the long weekend',
    time: '6 hour ago',
    icon: ICONS.NOTIF1,
  },
  {
    detail:
      'The sistem will have a maintainance for a several hour in this day',
    time: '6 hour ago',
    icon: ICONS.NOTIF2,
  },
  {
    detail:
      'The sistem will have a maintainance for a several hour in this day',
    time: '6 hour ago',
    icon: ICONS.NOTIF3,
  },
  {
    detail: 'Promo 40% Discount for special day in the long weekend',
    time: '6 hour ago',
    icon: ICONS.NOTIF1,
  },
  {
    detail:
      'The sistem will have a maintainance for a several hour in this day',
    time: '6 hour ago',
    icon: ICONS.NOTIF2,
  },
  {
    detail:
      'The sistem will have a maintainance for a several hour in this day',
    time: '6 hour ago',
    icon: ICONS.NOTIF3,
  },
  {
    detail: 'Promo 40% Discount for special day in the long weekend',
    time: '6 hour ago',
    icon: ICONS.NOTIF1,
  },
  {
    detail:
      'The sistem will have a maintainance for a several hour in this day',
    time: '6 hour ago',
    icon: ICONS.NOTIF2,
  },
  {
    detail:
      'The sistem will have a maintainance for a several hour in this day',
    time: '6 hour ago',
    icon: ICONS.NOTIF3,
  },
  {
    detail: 'Promo 40% Discount for special day in the long weekend',
    time: '6 hour ago',
    icon: ICONS.NOTIF1,
  },
  {
    detail:
      'The sistem will have a maintainance for a several hour in this day',
    time: '6 hour ago',
    icon: ICONS.NOTIF2,
  },
  {
    detail:
      'The sistem will have a maintainance for a several hour in this day',
    time: '6 hour ago',
    icon: ICONS.NOTIF3,
  },
];

const CheckoutCards = [
  {icon: ICONS.MENU, text: 'Category', title: 'Food & Drink'},
  {icon: ICONS.SHOP, text: 'Store', title: 'Hajimoto Store'},
  {icon: ICONS.CHART, text: 'Balance', title: '$ 5000.00'},
];

const CONSTANTS = {
  SPLASH_TIMEOUT,
  CheckoutCards,
  BottomNav,
  Notifs,
  QuickActions,
  Articles,
  Card,
  emailRegex,
  KeyPad,
  NumericButtons,
  Six,
  SignUpScreenBtnLabels,
  ModalMessage,
  HomeShortcut,
  signUpData,
};

export default CONSTANTS;
