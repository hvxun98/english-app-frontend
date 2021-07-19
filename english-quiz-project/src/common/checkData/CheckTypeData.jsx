export const checkTypeData = (data) => {

    if (data.match('.mp3')) {
        return "audio"
    }

    else if (data.match('.jpg') || data.match('.png') || data.match('.jpeg')) {
        return "image"
    }

    else if (data.match('.mp4')) {
        return "video"
    }

    else {
        return "text"
    }
}