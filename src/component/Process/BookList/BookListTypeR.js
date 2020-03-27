import React, { useEffect } from 'react';
import './BookListTypeR.css';
import './BookListTypeR_m.css';
import { BookItem } from '../Common';

// [책 리스트:타입 로우]
const BookListTypeR = (props) => {

    useEffect(() => {
        const scroll = () => {
            const list = document.querySelector("#cb-booklist-type-r");
            let down_pos_x = 0;
            let move_pos_x = 0;

            list.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                // list.style.cursor = "url('/img/icon-swipe-left.png') 64 64, auto";
                down_pos_x = e.clientX;
                list.addEventListener('mousemove', move(e));
            });

            list.addEventListener('mouseup', function(e) {
                e.stopPropagation();
                // list.style.cursor = "url('/img/icon-swipe-right.png') 64 64, auto";
                list.removeEventListener('mousemove', move(e));
            });

            const move = (e) => {
                e.stopPropagation();
                move_pos_x = down_pos_x - e.clientX;
                list.scrollLeft += move_pos_x * 3;
            }
        }
        scroll();
    })

    return (
        <div id="cb-booklist-type-r" className="cb-booklist-type-r">
            {
                props.bookRegisteredList.map((item, index) => {
                    return (
                        <BookItem item={item} key={index} margin={"0 30px 0 0"}/>
                    )
                })
            }
            {
                (() => {
                    if(props.isNext) {
                        return (
                            <div className="btn-more">
                                <i className="material-icons">
                                    last_page
                                </i>
                            </div>
                        )
                    }
                })()
            }
        </div>
    )
}

export default BookListTypeR;