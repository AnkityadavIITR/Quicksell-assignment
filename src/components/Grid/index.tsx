import React, { useCallback, useMemo } from 'react';
import './index.css'
import Column from '../Column';
import { Ticket, User } from '../../types/default';

function Grid({ gridData}: { gridData: Record<string, Ticket[]>}) {
    const keys: string[] = useMemo(() => Object.keys(gridData), [gridData]);
    return (
        <div className='grid'>
            {keys.map((k: string) => <Column key={k} tickets={gridData[k] as Ticket[]} groupBy={k}  />)}
        </div>
    );
}

export default Grid;
