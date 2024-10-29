import React, { useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';
import './index.css'
import { DisplaySetting,ArrowDown } from '../../utils/assets';
import usePriorityStore from '../../store/priority';
import { GroupingOption, OrderingOption } from '../../store/priority';

function DisplayDropdown() {

  const [visible, setVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const {setOrdering,setGrouping,grouping,ordering}=usePriorityStore()

  const openDropdown = useCallback(() => {
    setVisible(prev=>!prev);
  }, [],);

  const handleClickOutside = useCallback((event: any) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setVisible(false);
    }
  }, []);

  const onGroupingChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setGrouping(e.target.value as GroupingOption)
    setVisible(false);
  }, []);
  const onOrderingChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setOrdering(e.target.value as OrderingOption)
    setVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div className='display-dropdown' ref={componentRef}>
      <div className='dropdown-label-container' onClick={openDropdown}>
        <DisplaySetting  />
        <div className='dropdown-label'>Display</div>
        <ArrowDown/>
      </div>
      <div className={`dropdown-content-container ${visible && "visible"}`}>
        <div className='dropdown-content-row'>
          <div className='dropdown-content-label'>Grouping</div>
          <select name="grouping" id="grouping" value={grouping} onChange={onGroupingChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className='dropdown-content-row'>
          <div className='dropdown-content-label'>Ordering</div>
          <select name="ordering" id="ordering" value={ordering} onChange={onOrderingChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DisplayDropdown;
