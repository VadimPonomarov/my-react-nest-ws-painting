import React, {useState} from 'react';

import css from './toolbar.module.scss';
import toolState from "../../store/toolState";
import {newTool, handleStyle} from '../../services';

const Toolbar = () => {
    const [tools_l] = useState(["Brush", "Rect", "Circle", "Eraser", "Line"]);
    const [tools_r] = useState(["Undo", "Redo", "Save"]);

    return (
        <div className={css.toolbar}>
            <div className={css.toolbar__justify_left}>
                {tools_l
                    .map(item =>
                        <button
                            key={item}
                            className={[css.toolbar__btn, css[item.toLowerCase()]]
                                .join(' ')
                            }
                            onClick={() => toolState.setTool(
                                newTool(item)
                            )}
                        />
                    )
                }
                <button className={css.toolbar__btn}>
                    <input
                        id="color-fill-Id"
                        type="color"
                        onChange={(e) => handleStyle(e, 'fillStyle')}
                    />
                </button>
            </div>
            <div className={css.toolbar__justify_right}>
                {tools_r
                    .map(item => <button
                            key={item}
                            className={[css.toolbar__btn, css[item.toLowerCase()]]
                                .join(' ')
                            }
                            onClick={() => toolState.setTool(
                                newTool(item)
                            )}
                        />
                    )
                }
            </div>
        </div>

    );
};

export default Toolbar;