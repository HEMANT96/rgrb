import axios from 'axios';
//const apiUrl = 'http://localhost:3000/';
const apiUrl = 'https://regrub-demo-api.tk/';
import {   loadingController,   toastController } from "@ionic/vue";
declare const AWS: any;

const getCall = async (url: string) => {
  try {
    const apidata = await axios.get(`${apiUrl + url}`);
    return { isError: false, apidata: apidata.data }
  } catch (error) {
    return { isError: true, error }
  }
}

const postCall = async (url: string, data: any) => {
  try {
    const apidata = await axios.post(`${apiUrl + url}`, data);
    return { isError: false, apidata: apidata.data }
  } catch (error) {
    return { isError: true, error }
  }
}

const putCall = async (url: string, data: any) => {
  try {
    const apidata = await axios.put(`${apiUrl + url}`, data);
    return { isError: false, apidata: apidata.data }
  } catch (error) {
    return { isError: true, error }
  }
}

let loader: any = null;
const showLoading = async () => {
  loader = await loadingController.create({
    cssClass: "my-custom-class",
    message: "Please wait...",
    duration: 3000,
  });

  await loader.present();
}

const hideLoading = async () => {
  await loader.dismiss();
}


const presentToastWithOptions = async (_message: any) => {
  const toast = await toastController
    .create({
      message: _message,
      duration: 4000
    })
  return toast.present();
}

const uploadImage = async (currentFile: any) => {
  return new Promise((resolve, reject) => {


    //var self = this;
    const fileName = currentFile.name || (new Date().getTime().toString() + ".png");
    // let filetype = fileName.split(".")[1];
    const fileNameToSend = new Date().getTime() + fileName.substring(fileName.indexOf("."), fileName.length);
    const photoKey = "regrub/" + "123" + "/" + fileNameToSend;

    const albumBucketName = "dolphino";
    const bucketRegion = "us-west-2";
    const IdentityPoolId = "us-west-2:ff182092-2a76-489c-9d58-45ba742d9e7d";
    AWS.config.update({
      region: "us-west-2", //'us-west-2',
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
      }),
    });

    const awsS3SObj = new AWS.S3({
      apiVersion: "2012-10-17", //'2006-03-01',
      params: {
        Bucket: albumBucketName,
      },
    });
    awsS3SObj.upload(
      {
        Key: photoKey,
        Body: currentFile,
        ACL: "public-read",
      }, function (err: any, data: any) {
        if (err) {
          alert("There was an error uploading your Image: ");
          resolve(null);
        } else {
          resolve(data.Location); // "https://i.picsum.photos/id/469/200/300.jpg?hmac=XkjIV9jof2hkk4eUpQpbQVMBiSTfqdlJxIdlcIdEM6Q")
        }
      });
  })
}


export default {
  getCall, postCall, putCall,  showLoading , hideLoading, presentToastWithOptions, uploadImage
}
