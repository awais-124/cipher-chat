const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPLASH_TIMEOUT = 3000;

const signUpData = {
  name: '',
  phone: '',
  email: '',
  password: '',
  birthday: '',
};

const ModalMessage = {
  forgotPass: 'Email found. Now you can reset your password successfully!',
  resetPass: 'Your password has been reset successfully!',
  signUpPin: 'Yay! Your PIN code has been created. Continue to B-Wallet!',
};

// messages.js

 const receivedMessages = [
   {id: 'abc123', text: 'Hello! How are you?', date: '2024-06-10'},
   {
     id: 'def456',
     text: 'Don’t forget the meeting tomorrow.',
     date: '2024-06-09',
   },
   {id: 'ghi789', text: 'Can you send me the report?', date: '2024-06-08'},
   {
     id: 'jkl012',
     text: 'We need to discuss the project details.',
     date: '2024-06-07',
   },
   {id: 'mno345', text: 'Are you available for a call?', date: '2024-06-06'},
   {
     id: 'pqr678',
     text: 'Please review the attached document.',
     date: '2024-06-05',
   },
   {id: 'stu901', text: 'Let’s catch up over lunch.', date: '2024-06-04'},
   {
     id: 'vwx234',
     text: 'Happy Birthday! Have a great day!',
     date: '2024-06-03',
   },
   {
     id: 'yza567',
     text: 'The deadline for the project is next week.',
     date: '2024-06-02',
   },
   {
     id: 'bcd890',
     text: 'Could you please provide an update on the task?',
     date: '2024-06-01',
   },
   {id: 'efg123', text: 'Looking forward to the weekend!', date: '2024-05-31'},
   {id: 'hij456', text: 'Can we reschedule our meeting?', date: '2024-05-30'},
   {
     id: 'klm789',
     text: 'Congratulations on your promotion!',
     date: '2024-05-29',
   },
   {
     id: 'nop012',
     text: 'I will be out of office tomorrow.',
     date: '2024-05-28',
   },
   {id: 'qrs345', text: 'Can you review the latest draft?', date: '2024-05-27'},
   {
     id: 'tuv678',
     text: 'Please find the minutes of the meeting attached.',
     date: '2024-05-26',
   },
   {id: 'wxy901', text: 'Can we have a quick call?', date: '2024-05-25'},
   {
     id: 'zab234',
     text: 'Reminder: Project deadline approaching.',
     date: '2024-05-24',
   },
   {id: 'cde567', text: 'Thank you for your assistance.', date: '2024-05-23'},
   {
     id: 'fgh890',
     text: 'Looking forward to your feedback.',
     date: '2024-05-22',
   },
 ];

 const sentMessages = [
   {id: 'zyx987', text: 'I am doing well, thank you!', date: '2024-06-10'},
   {id: 'wvu654', text: 'Sure, I will be there on time.', date: '2024-06-09'},
   {id: 'tsr321', text: 'Yes, I will send it by EOD.', date: '2024-06-08'},
   {
     id: 'qpo098',
     text: 'We should schedule a meeting for next week.',
     date: '2024-06-07',
   },
   {
     id: 'nml765',
     text: 'I am available for a call in the afternoon.',
     date: '2024-06-06',
   },
   {
     id: 'kjh432',
     text: 'I have reviewed the document. Looks good.',
     date: '2024-06-05',
   },
   {id: 'gfe109', text: 'Lunch sounds great! Let’s do it.', date: '2024-06-04'},
   {
     id: 'dcb876',
     text: 'Thank you for the birthday wishes!',
     date: '2024-06-03',
   },
   {
     id: 'axw543',
     text: 'I am working on the task and will update you soon.',
     date: '2024-06-02',
   },
   {
     id: 'vut210',
     text: 'I will make sure the project is completed by the deadline.',
     date: '2024-06-01',
   },
   {
     id: 'rqp987',
     text: 'Thank you for your prompt response.',
     date: '2024-05-31',
   },
   {
     id: 'onm654',
     text: 'Can we postpone our meeting to next week?',
     date: '2024-05-30',
   },
   {
     id: 'lkj321',
     text: 'Congratulations on your achievement!',
     date: '2024-05-29',
   },
   {
     id: 'hgf098',
     text: 'I will be working from home tomorrow.',
     date: '2024-05-28',
   },
   {
     id: 'edc765',
     text: 'Please review the attached draft.',
     date: '2024-05-27',
   },
   {
     id: 'cba432',
     text: 'Minutes of the meeting have been shared.',
     date: '2024-05-26',
   },
   {id: 'yxw109', text: 'Can we discuss this over a call?', date: '2024-05-25'},
   {
     id: 'uts876',
     text: 'Project deadline is coming up soon.',
     date: '2024-05-24',
   },
   {id: 'srq543', text: 'Thank you for your help.', date: '2024-05-23'},
   {id: 'pon210', text: 'I look forward to your feedback.', date: '2024-05-22'},
 ];


 const sortMessagesByDate = messages =>
   messages.sort((a, b) => new Date(b.date) - new Date(a.date));

 function convertTimestampToDate(timestamp) {
   try {
     const date = new Date(
       timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000),
     );

     // Arrays with month names and day names
     const monthNames = [
       'Jan',
       'Feb',
       'Mar',
       'Apr',
       'May',
       'Jun',
       'Jul',
       'Aug',
       'Sep',
       'Oct',
       'Nov',
       'Dec',
     ];
     const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

     // Format the date components
     const hours = date.getHours();
     const minutes = date.getMinutes();
     const period = hours >= 12 ? 'PM' : 'AM';
     const formattedHours = hours % 12 || 12; // Convert hours to 12-hour format
     const formattedMinutes = minutes.toString().padStart(2, '0');
     const day = dayNames[date.getDay()]; // Get day name from array
     const month = monthNames[date.getMonth()]; // Get month name from array
     const dayOfMonth = date.getDate();
     const year = date.getFullYear();

     // Log each component
     //  console.log('Hours:', hours);
     //  console.log('Minutes:', minutes);
     //  console.log('Period:', period);
     //  console.log('Formatted Hours:', formattedHours);
     //  console.log('Formatted Minutes:', formattedMinutes);
     //  console.log('Day:', day);
     //  console.log('Month:', month);
     //  console.log('Day of Month:', dayOfMonth);
     //  console.log('Year:', year);

     // Construct the formatted string
     const formattedDate = `${formattedHours}:${formattedMinutes} ${period} ${day} ${month} ${dayOfMonth}, ${year}`;
     return formattedDate;
   } catch (error) {
     console.error('Error converting timestamp to date:', error);
     return new Date().toDateString(); // Fallback to current date string
   }
 }

 const CONSTANTS = {
   convertTimestampToDate,
   SPLASH_TIMEOUT,
   sortMessagesByDate,
   emailRegex,
   ModalMessage,
   signUpData,
   sentMessages,
   receivedMessages,
 };

export default CONSTANTS;
