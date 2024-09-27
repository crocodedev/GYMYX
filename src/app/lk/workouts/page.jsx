'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTrainingData, resetTrainingData } from '@/redux/transferTrainingData';

// import { useSelector } from 'react-redux';

import PageHeading from '@/Sections/Account/PageHeading';
import NavigationTabs from '@/Sections/Account/NavigationTabs';
import TrainingContent from '@/Sections/Account/Training/TrainingContent';
import TrainingCalendar from '@/Sections/Account/Training/TrainingCalendar';
import TrainingItems from '@/Sections/Account/Training/TrainingItems';
import Loading from '@/Components/Loading';
import { formatDate } from '@/Utils/helpers';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import { updateBookingVisitDate } from '@/redux/bookingSlice';

import { cancelBooking, canDelete } from '@/Sections/Account/ProfileTrainings/helpers';

export const getTrainingData = async (token) => {
  const result = await fetch('/api/booking/get-bookings', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  const response = await result.json();
  if (!response.error) {
    return response;
  }
};

const TABS = [
  { id: 0, title: 'Предстоящие' },
  { id: 1, title: 'Архив' },
];

const concateDateTime = (date, time) => {
  const fullDateTimeStr = `${date}T${time}`;
  return new Date(fullDateTimeStr);
};

const Training = () => {
  const { data: sessionData } = useSession();
  const [allTrainingsDates, setAllTrainingsDates] = useState([]);
  const [sortedTrainingsDates, setSortedTrainingsDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [latestDataTrainings, setLatestDataTrainings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    updateDate();
  }, [sessionData, sessionData]);

  useEffect(() => {
    const dataTemp = getDataForPeriod(selectedTab, allTrainingsDates);

    setSortedTrainingsDates(
      dataTemp.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA - dateB;
        } else {
          const timeA = new Date(`1970-01-01T${a.time}`);
          const timeB = new Date(`1970-01-01T${b.time}`);
          return timeA - timeB;
        }
      }) || [],
    );
  }, [selectedTab, allTrainingsDates]);

  const changeTraining = (oldId, oldDate, oldTime) => {
    dispatch(resetTrainingData())
    console.log(oldId, oldDate, oldTime) 
    if (!sessionData?.user?.accessToken) return;

    dispatch(updateBookingVisitDate({ visitDate: {value: "", time: []}}));
    dispatch(setTrainingData({oldId, oldDate, oldTime}))
    router.push(`/lk/booking/change-trainitg`)
  }

  const updateDate = () => {
    if (!sessionData?.user?.accessToken) return;
    let result;

    if (selectedDate) {
      result = sortedTrainingsDates.filter(({ date }) => date === selectedDate.date);
    }

    setLatestDataTrainings(result);
    getTrainingData(sessionData?.user?.accessToken).then(({ data = [] }) => {
      setAllTrainingsDates(data);
      setLoading(false);
    });
  };

  const handleChangeSelectedDate = (value) => {
    const selectedDateTemp = allTrainingsDates.filter(({ date }) => formatDate(date) === formatDate(value));

    if (!selectedDateTemp?.length) return;

    if (selectedDateTemp[0].date === (selectedDate && selectedDate.date)) {
      setSelectedDate(null);
    } else {
      setSelectedDate(selectedDateTemp[0]);
    }
  };

  const getDataForPeriod = (tab_id, data) => {
    let returnedData = [];
    if (tab_id === 0) {
      //ПРЕДСТОЯЩИЕ

      returnedData = data.filter(({ date, time }) => concateDateTime(date, time) >= new Date());
    } else {
      //АРХИВ

      returnedData = data.filter(({ date, time }) => concateDateTime(date, time) < new Date());
    }

    return returnedData;
  };

  const handleChangeSelectedTab = (index) => {
    setSelectedTab(index);
    setSelectedDate(null);
  };

  const handleShow = (id = -1) => {
    setShowModal((prev) => !prev);
    setCurrentItemId(id);
  };

  const handleClickDelete = () => {
    if (currentItemId > 0) {
      setLoadingDelete(true);
      deleteBookingItem(currentItemId);
    }
  };

  const deleteBookingItem = (id) => {
    if (canDelete(sortedTrainingsDates)) {
      cancelBooking(sessionData.user.accessToken, id).then((data) => {
        if (data.data.status) {
          updateDate();
          setLoadingDelete(false);
          handleShow();
        }
      });
    }
  };

  if (loading) return <Loading full_screen={true} />;

  return (
    <>
      {showModal && (
        <Modal handleClose={handleShow} text={'Вы точно хотите отменить тренировку?'}>
          <Button
            onClick={handleClickDelete}
            fullSize={true}
            size="l"
            label={!loadingDelete ? 'Да' : 'Загрузка'}
            variant="black"
            disabledShadow={true}
          />
          <Button onClick={handleShow} fullSize={true} size="l" label="Нет" variant="blue" disabledShadow={true} />
        </Modal>
      )}
      <div className="account-page-wrapper">
        <PageHeading title={'Мои тренировки'} />
        <NavigationTabs items={TABS} selectedTab={selectedTab} handleChangeTab={handleChangeSelectedTab} />
        <TrainingContent>
          <TrainingCalendar
            selectedDate={selectedDate}
            onHandleChange={handleChangeSelectedDate}
            availableDates={sortedTrainingsDates}
          />
          <TrainingItems
            onDelete={deleteBookingItem}
            token={sessionData?.user?.accessToken}
            handleUpdateDate={updateDate}
            handleDeleteItem={handleShow}
            handlerChangeTraining={changeTraining}
            selectedDate={selectedDate}
            archive={selectedTab === 1}
            items={sortedTrainingsDates}
          />
        </TrainingContent>
      </div>
    </>
  );
};

export default Training;
