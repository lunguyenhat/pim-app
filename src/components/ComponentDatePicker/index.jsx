import React, { useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';

import DatePicker, { registerLocale } from 'react-datepicker';
import './index.scss';
import moment from 'moment';

import vi from 'date-fns/locale/vi';
import de from 'date-fns/locale/de';
import uk from 'date-fns/locale/uk';
import es from 'date-fns/locale/es';
import { enUS } from 'date-fns/locale';
import { FORMAT_DATE } from 'constants/FormFieldType';
import { useThemeContext } from 'themes/ThemeContextProvider';
registerLocale('vi', vi);
registerLocale('de', de);
registerLocale('uk', uk);
registerLocale('es', es);
registerLocale('en-US', enUS);

function ComponentDatepicker({ isOpen, setIsOpen, datePickerRef, placeholder, isDays, ...props }) {
  const { t, i18n, viewModel } = props;
  const [dateRange, setDateRange] = useState([
    moment(viewModel.filterDate['filter[start_date]']).toDate(),
    moment(viewModel.filterDate['filter[end_date]']).toDate(),
  ]);

  const { theme } = useThemeContext();

  const [startDate, endDate] = dateRange;
  const pickerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutSide);
    return () => window.removeEventListener('mousedown', handleClickOutSide);
  }, []);

  const handleApply = async (e, startDate, endDate) => {
    e.stopPropagation();
    viewModel.getStatisticalDataByDate(
      moment(startDate).format('YYYY-MM-DD'),
      moment(endDate).format('YYYY-MM-DD')
    );
    setIsOpen(false);
  };
  const handleClickOutSide = (event) => {
    let currentRef = datePickerRef ?? pickerRef;
    if (isOpen && !currentRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleOpenDatePicker = (event) => {
    if (isOpen && pickerRef.current && !pickerRef.current.contains(event.target)) {
      setIsOpen(false);
    } else setIsOpen(true);
  };
  const MyContainer = ({ className, children }) => {
    return (
      <div ref={pickerRef} className="rounded-3 shadow overflow-hidden py-2 px-1 bg-white">
        <div className={`${className}`}>{children}</div>
        {startDate && (
          <div className="d-flex align-items-center justify-content-end border-top-1 pt-2 px-2 text-color">
            <p className="fs-14 color-bule-0 opacity-75 mb-0">
              {startDate ? moment(startDate).format('LL') : ''} -{' '}
              {endDate ? moment(endDate).format('LL') : ''}
            </p>
            <span
              style={{ cursor: 'pointer' }}
              className="btn btn-success ms-3 fw-bold text-uppercase fs-14 lh-sm rounded-1 py-1"
              onClick={(e) => handleApply(e, startDate, endDate)}
            >
              {t('txt_apply')}
            </span>
          </div>
        )}
      </div>
    );
  };
  const getDateDiff = (start, end) => {
    if (!start || !end) return 0;
    return moment(end).diff(moment(start), 'days') + 1;
  };
  const getDateDiffString = (start, end) => {
    let startDate = start ? moment(start).format('DD MMM, YYYY') : '';
    let endDate = end ? moment(end).format('DD MMM, YYYY') : '';
    let result = placeholder;
    if (start || end) {
      result =
        getDateDiff(start, end) == 1
          ? startDate !== moment().format('DD MMM, YYYY')
            ? startDate
            : t('txt_today')
          : startDate + ` ${endDate ? '-' : ''} ` + endDate;
    }
    return result;
  };
  return (
    <div onClick={handleOpenDatePicker} className="position-relative daterange-picker w-100">
      <DatePicker
        style={{ margin: 0 }}
        dateFormat={FORMAT_DATE}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        value={
          !isDays
            ? getDateDiffString(startDate, endDate)
            : getDateDiff(startDate, endDate)
            ? `${getDateDiff(startDate, endDate)} ${t('txt_days')}`
            : placeholder
        }
        isClearable={false}
        className={`${isDays ? 'fs-14 fw-semibold mw-120' : 'ps-5 pe-5'} ${
          theme.theme === 'light' ? 'shadow-sm' : ''
        } form-control border-0 rounded-1 text-color opacity-100 h-100 bg-white`}
        showPopperArrow={false}
        monthsShown={2}
        open={isOpen}
        locale={i18n.language}
        calendarContainer={MyContainer}
      />
    </div>
  );
}

export default withTranslation('common')(ComponentDatepicker);
