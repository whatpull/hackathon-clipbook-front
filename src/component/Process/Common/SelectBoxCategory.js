import React, { useEffect, useState } from 'react';
import './SelectBoxCategory.css';
import { useSelector } from 'react-redux';

// [셀렉트 박스] 카테고리
const SelectBoxCategory = (props) => {
    const bookCategory = useSelector(state => state.bookCategory);
    const [isInit, setIsInit] = useState(true);

    useEffect(() => {
        const select_box = () => {
            const target = document.getElementById("selectbox-category" + "-" + props.id);

            // 선택된 아이템
            const selects = target.getElementsByTagName("select")[0];
            const selected_item = document.createElement("DIV");
            selected_item.setAttribute("class", "select-selected");
            selected_item.innerHTML = selects.options[selects.selectedIndex].innerHTML;
            target.appendChild(selected_item);
    
            // 선택할 아이템
            const select_item_wrapper = document.createElement("DIV");
            select_item_wrapper.setAttribute("class", "select-items select-hide");

            // 검색
            if(props.search) {
                const select_item_search = document.createElement("DIV");
                select_item_search.setAttribute("class", "select-items-search");
                const search_input = document.createElement("INPUT");
                search_input.setAttribute("type", "text");
                search_input.addEventListener("keyup", keyEvent);
                search_input.addEventListener("click", function(e) {
                    e.stopPropagation();
                });
                select_item_search.appendChild(search_input);
                select_item_wrapper.appendChild(select_item_search);
            }

            // 선택할 아이템 추가
            const selects_size = selects.length;
            for(let i = 0; i < selects_size; i++) {
                const select_item = document.createElement("DIV");
                select_item.innerHTML = selects.options[i].innerHTML;
                select_item.setAttribute("value", selects.options[i].value);
                select_item.addEventListener("click", function(e) {
                    e.preventDefault();
                    let prev_selected_items;
                    // const selected_item = this.parentNode.previousSibling;
                    for(let i = 0; i < selects_size; i++) {
                        if (selects.options[i].innerHTML == this.innerHTML) {
                            selects.selectedIndex = i;  // 셀렉트 박스 선택
                            selected_item.innerHTML = this.innerHTML;   // 선택된 아이템 표시

                            // 이전 선택된 아이템 클래스 제거
                            prev_selected_items = this.parentNode.getElementsByClassName("same-as-selected");
                            const prev_selected_items_size = prev_selected_items.length;
                            for (let j = 0; j < prev_selected_items_size; j++) {
                                prev_selected_items[j].removeAttribute("class");
                            }

                            this.setAttribute("class", "same-as-selected");

                            const bc_seq = selects.options[selects.selectedIndex].value;
                            selected_item.setAttribute("value", bc_seq);
                            if(typeof props.callback === "function") props.callback(bc_seq);
                            break;
                        }
                    }
                    selected_item.click();
                });
                select_item_wrapper.appendChild(select_item);
            }
            target.appendChild(select_item_wrapper);

            // 선택된 아이템 클릭 이벤트
            selected_item.addEventListener("click", function(e) {
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });

            function keyEvent(e) {
                const query = typeof e === "undefined" ? "" : e.target.value;
                const select_children_items = document.getElementsByClassName("select-items")[0].children;
                const select_children_items_size = select_children_items.length;
                for (let i = 2; i < select_children_items_size; i++) {
                    if (select_children_items[i].innerHTML.includes(query)) {
                        select_children_items[i].classList.remove("select-hide");
                    } else {
                        select_children_items[i].classList.add("select-hide");
                    }
                }
            }

            // 닫기 실행
            const closeAllSelect = (elmnt) => {
                const arrNo = [];

                // 검색어 초기화
                if(props.search) {
                    search_input.value = "";
                    keyEvent();
                }
                
                // 선택된 아이템
                const selected_items = document.getElementsByClassName("select-selected");
                const selected_items_size = selected_items.length;
                for (let i = 0; i < selected_items_size; i++) {
                    if (elmnt == selected_items[i]) {
                        arrNo.push(i)
                    } else {
                        selected_items[i].classList.remove("select-arrow-active");
                    }
                }
                
                // 선택할 아이템
                const select_items = document.getElementsByClassName("select-items");
                const select_items_size = select_items.length;
                for (let i = 0; i < select_items_size; i++) {
                    if (arrNo.indexOf(i)) {
                        select_items[i].classList.add("select-hide");
                    }
                }
            }
            // 전체 닫기 이벤트(영향이 있어 확인필요)
            // document.addEventListener("click", closeAllSelect);
        }
        if(isInit) {   
            select_box();
            setIsInit(false);
        }
    }, [bookCategory, props.id, props.callback]);

    return (
        <div id={"selectbox-category" + "-" + props.id} className={"cb-selectbox-category " + (typeof props.mode === "undefined" ? "" : props.mode)} style={{width: props.width, margin: props.margin}}>
            <select>
                <option value="0">카테고리</option>
                {
                    bookCategory.bookCategoryListDatas.map((item, index) => {
                        return (
                            <option value={item.category.bc_seq} key={index}>{item.category.kr_name}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default SelectBoxCategory;