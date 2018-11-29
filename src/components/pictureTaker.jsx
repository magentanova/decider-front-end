import React from "react";
import { connect } from "react-redux"
import Camera from "react-camera";

import numgl from "../numgl";

class PictureTaker extends React.Component {

  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.photoCaptureCountdown === 1 && this.props.photoCaptureCountdown === 0) {
        this.camera.capture()
            .then(blob => {
                this.img.src = URL.createObjectURL(blob);
                this.img.onload = () => {
                    var imageId = numgl.store_picture("image-preview")
                    numgl.show_canvas(imageId)
                    this.props.showCanvas()
                    var convResult = numgl.convolution(imageId,[0,-1,0,-1,5,-1,0,-1,0])
                    numgl.threshold(convResult,9)
                    numgl.do_it()
                    this.props.hidePhotoCapture()
                    setTimeout(() => {
                        this.props.saveImage(this.canvas.toDataURL())
                        this.props.hideCanvas()
                    }, 3000)
                }
            })
    }
  }

  takePicture() {
    this.camera.capture()
  }

  render() {
    return (
      <div 
        className="camera-wrapper" 
        style={{display: this.props.photoCaptureShowing ? "block" : "none"}}>
        <Camera
          style={style.preview}
          ref={(cam) => {
            this.camera = cam;
          }}
        >
          <div 
            style={style.captureContainer} 
            >
            <p style={{color: "white", fontWeight: "bolder"}}>{this.props.photoCaptureCountdown || ""}</p>
          </div>
        </Camera>
        <img
          id="image-preview"
          style={style.captureImage}
          ref={(img) => {
            this.img = img;
          }}
        />
        <canvas 
            ref={can => this.canvas = can}
            style={{display: this.props.canvasShowing ? "block" : "none"}} 
            className="shaded-portrait" /> 
      </div>
    );
  }
}

const style = {
  preview: {
    marginTop: "2rem",
    position: 'relative',
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
    display: "none"
  }
};

export default connect(
    ({ photoCaptureCountdown, photoCaptureShowing}) => ({ photoCaptureCountdown, photoCaptureShowing})   
)(PictureTaker)