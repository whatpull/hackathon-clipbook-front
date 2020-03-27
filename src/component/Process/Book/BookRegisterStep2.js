import React, { useEffect } from 'react';
import './BookRegisterStep2.css';
import './BookRegisterStep2_m.css';
import { useSelector } from 'react-redux';
import { SelectBoxCategory } from '../../Process/Common';

// [책 등록:스텝2]
const BookRegisterStep2 = () => {
    const bookRegister = useSelector(state => state.bookRegister);

    useEffect(() => {
        document.querySelector("#title").value = bookRegister.bookRegisterParams.title;
        document.querySelector("#author").value = bookRegister.bookRegisterParams.author;
        const bc_seq = bookRegister.bookRegisterParams.bc_seq;
        const category_items = document.querySelector("#selectbox-category-book-register .select-items").children;
        const category_selected_item = document.querySelector("#selectbox-category-book-register .select-selected");
        for(let item of category_items) {
            if(item.getAttribute("value") == bc_seq) {
                item.click(); // 아이템 선택
                category_selected_item.click(); // 아이템 닫기
            }
        }
        document.querySelector("#summary").value = bookRegister.bookRegisterParams.summary;
    }, [bookRegister]);

    useEffect(() => {
        const category = document.querySelector("#selectbox-category-book-register");
        const selected_item = category.querySelectorAll(".select-selected")[0];
        const items = category.querySelectorAll(".select-items")[0];
        if(!items.classList.contains("select-hide")) {
            selected_item.click();
        }
    })

    return (
        <div className="cb-book-register-step2">
            <div className="title">
                <input id="title" type="text" autoComplete="false"/>
            </div>
            <div className="author">
                <input id="author" type="text" autoComplete="false"/>
            </div>
            <div className="category">
                <SelectBoxCategory id="book-register" width="100%" mode="input" search={false}/>
            </div>
            <div className="summary">
                <textarea id="summary"></textarea>
            </div>
        </div>
    )
}

export default BookRegisterStep2;