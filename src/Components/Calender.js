import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchnoticeById } from '../Pages/Notice/NoticeSlice';
import { fetchEvent } from '../Pages/Event/EventSlice';

function ServerDay(props) {
  const { notices = [], events = [], day, outsideCurrentMonth, onClick, isToday, ...other } = props;

  // Check if the day is a notice day
  const isNotice = notices.some(notice => day.isSame(dayjs(notice.date), 'day'));

  // Check if the day is an event start day
  const isEvent = events.some(event => day.isSame(dayjs(event.startDate), 'day'));

  // Decide the badge content based on whether the day is a notice day or an event day
  const badgeContent = isNotice ? '🔴' : isEvent ? '🔵' : undefined;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={badgeContent}
      onClick={(isNotice || isEvent) ? (event) => onClick(event, day) : undefined}
      sx={{
        backgroundColor: isToday ? '#ffcccb' : 'transparent', // Set today's background color here
        '&:hover': {
          backgroundColor: isToday ? '#ffa07a' : 'transparent', // Change background color on hover if needed
        },
      }}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function Calendar() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const notice = useSelector((state) => state.notice.notice || []);
  const events = useSelector((state) => state.events.event || []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotices, setSelectedNotices] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    // Fetch notices and events data
    dispatch(fetchnoticeById());
    dispatch(fetchEvent());
  }, [dispatch]);

  const handleMonthChange = () => {
    setIsLoading(true);
    // Implement any additional logic needed when the month changes
    setIsLoading(false);
  };

  const handleDayClick = (event, day) => {
    // Filter notices and events for the selected day
    const dayNotices = notice.filter(item => dayjs(item.date).isSame(day, 'day'));
    const dayEvents = events.filter(item => dayjs(item.startDate).isSame(day, 'day'));
    setSelectedNotices(dayNotices);
    setSelectedEvents(dayEvents);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            notices: notice, // Pass all notices to ServerDay
            events: events, // Pass all events to ServerDay
            onClick: handleDayClick,
          },
        }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ marginTop: 1, padding: 0 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List sx={{ padding: 0 }}>
          {selectedNotices.map((notice, index) => (
            <ListItem
              key={`notice-${index}`}
              sx={{
                fontSize: 12,
                backgroundColor: 'blue',
                padding: '5px',
                marginTop: '2px',
                color: 'white',
              }}
            >
              {`Notice: ${notice.subject}`}
            </ListItem>
          ))}
          {selectedEvents.map((event, index) => (
            <ListItem
              key={`event-${index}`}
              sx={{
                fontSize: 12,
                backgroundColor: 'green',
                padding: '5px',
                marginTop: '2px',
                color: 'white',
              }}
            >
              {`Event: ${event.name}`}
            </ListItem>
          ))}
        </List>
      </Popover>
    </LocalizationProvider>
  );
}
