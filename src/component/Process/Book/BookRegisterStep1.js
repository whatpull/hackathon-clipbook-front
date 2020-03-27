import React from 'react';
import './BookRegisterStep1.css';
import './BookRegisterStep1_m.css';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

// [책 등록:스텝1]
class BookRegisterStep1 extends React.Component {

    // 크롭 콜백
    _crop() {
        if(typeof this.cropper === "undefined"){
            return;
        } else {
           const thumbnail = this.cropper.getCroppedCanvas().toDataURL();
           this.props.handleClickBookRegisterStep2(thumbnail);
        }
    }

    render() {
        return (
            <div className="cb-book-register-step1">
                <div className="button">
                    <button className="item" type="button" onClick={this._crop.bind(this)}>NEXT</button>
                </div>
                <div className="thumbnail">
                    <Cropper
                        ref={cropper => { this.cropper = cropper; }}
                        src={this.props.bookRegister.bookRegisterParams.crop_thumbnail === '' ? "/img/icon-noimage.png" : this.props.bookRegister.bookRegisterParams.crop_thumbnail}
                        style={{ width: "200px", height: "250px" }}
                        dragMode={"move"}
                        preview=".preview"
                        minContainerWidth={200}
                        minContainerHeight={250}
                        minCropBoxWidth={200}
                        minCropBoxHeight={250}
                        cropBoxResizable={false}
                        zoomOnWheel={true}
                        zoomOnTouch={true}
                        aspectRatio={4 / 5}
                        guides={true}/>
                    <div className="empty">
                        <i className="material-icons" style={{fontSize: "50px"}}>
                            redo
                        </i>
                    </div>
                    <div id="preview" className="preview" />
                </div>
                <div className="file">
                    <input type="file" onChange={this.props.handleChangeFile.bind(this)}/>
                </div>
                <div className="content">
                    이미지 사이즈는 <span className="highlight">4(가로) X 5(세로)</span> 비율로 최적화 되어있습니다.<br/>
                    이미지는 용량은 최대 <span className="highlight">2MB</span>를 초과할 수 없습니다.<br/>
                    <span className="highlight">마우스 휠</span>을 활용하여 이미지 사이즈를 조정할 수 있습니다.
                </div>
            </div>
        )
    }
}

export default BookRegisterStep1;