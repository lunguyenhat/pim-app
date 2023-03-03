import ComponentDatePicker from 'components/ComponentDatePicker';
import React, { useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import './index.scss';

const DateRangePicker = (props) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const { placeholder, viewModel } = props;

  return (
    <div
      ref={datePickerRef}
      className="bg-white rounded-1 daterange-picker-wrapper position-relative z-index-10 h-100 cursor-pointer"
    >
      <ComponentDatePicker
        isOpen={openDatePicker}
        setIsOpen={setOpenDatePicker}
        datePickerRef={datePickerRef}
        placeholder={placeholder}
        viewModel={viewModel}
      />
      <div className="calendar-icon calendar-icon-end position-absolute top-50 translate-middle-y">
        <i className="icons text-green">
          <FontAwesomeIcon icon={faChevronDown} style={{ width: '12px' }} />
        </i>
      </div>
    </div>
  );
};

export default withTranslation('common')(DateRangePicker);
