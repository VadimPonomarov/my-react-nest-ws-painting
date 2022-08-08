import React from 'react';

import css from './settingbar.module.scss';
import {handleStyle} from '../../services';

const Settingbar = () => {
    return (
        <div className={[css.settingbar]
            .join(' ')
        }>
            <label htmlFor="line-width">Толщина линии</label>
            <input
                id="line-width-id"
                className="ms-2"
                type="number"
                defaultValue={1}
                min={1}
                max={50}
                onChange={(e) => handleStyle(e, 'lineWidth')}
            />
            <label htmlFor="line-width">Цвет обводки</label>
            <button className={css.settingbar__btn}>
                <input
                    id="color-stroke-id"
                    type="color"
                    onChange={(e) => handleStyle(e, "strokeStyle")}
                />
            </button>

        </div>
    );
};

export default Settingbar;