function convertToStarsArray(stars) {
    var num = stars / 10;
    var array = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            array.push(1);
        } else if (i === num + .5) {
            array.push(2);
        } else {
            array.push(0);
        }
    }

    return array;
}
function convertToCastInfos(casts) {
    var castsArray = [];
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}
function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length -2);
}
function http(url, callback) {
    wx.showNavigationBarLoading();
    wx.request({
        url: url,
        header: {
            'content-type': 'json'
        },
        success: function (res) {
            callback(res.data)
            wx.hideNavigationBarLoading();
        }
    })
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos
}