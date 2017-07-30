// @flow
import {
	Linking
} from "react-native";

const moment = require("moment");

export const openUrl = (url: string) => {
	Linking.canOpenURL(url).then((supported) => {
		if (!supported) {
			console.log(`Can\"t handle url: ${url}`);
		} else {
			return Linking.openURL(url);
		}
	}).catch((err) => console.error("An error occurred", err));
};

export const itemIsEmpty = (item: any) => {
	try {
		const itemToTest = typeof item;

		switch(itemToTest) {

			case "undefined":
				return true;

			case "object":
				if (!item) {
					return true;
				}
				return Object.keys(item).length === 0;
				break;

			case "function":
				return /^function[^{]*[{]\s*[}]\s*$/.test(Function.prototype.toString.call(item));
				break;

			default:
			return item[0] === undefined || item[0] === null;
		}

	} catch (e) {
		return true;
	}
};

export const isFunction = (functionToCheck) => {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]" && typeof(functionToCheck) === "function";
};

export const getHoursFromSeconds = (sec: string) => {
	const secNum = parseInt(sec, 10);
	const hours = Math.floor(secNum / 3600);
	let minutes = Math.floor((secNum - (hours * 3600)) / 60);

	if (hours > 0) {
		const text = hours > 1 ? "hours" : "hour";
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		return `${hours}:${minutes} ${text}`;
	}

	let minuteText;
	if (minutes <= 1) {
		minuteText = "minute";
	} else {
		minuteText = "minutes";
	}

	return `${minutes} ${minuteText}`;
};

export const tokenExpired = (tokenExpiration) => {
	return tokenExpiration && Date.now() + 5000 > tokenExpiration;
};

export const isLessThanFifteenMinutes = (ms: number) => {
	const days = Math.floor(ms / (24*60*60*1000));
	const hoursms=ms % (60*60*1000);
	const minutes = Math.floor((hoursms)/(60*1000));
	return days < 1 && minutes < 15;
};

export const getTimeFromMilliseconds = (ms: number) => {
	const days = Math.floor(ms / (24*60*60*1000));
	const daysms=ms % (24*60*60*1000);
	let hours = Math.floor((daysms)/(60*60*1000));
	const hoursms=ms % (60*60*1000);
	let minutes = Math.floor((hoursms)/(60*1000));
	const minutesms=ms % (60*1000);
	let sec = Math.floor((minutesms)/(1000));
	hours < 10 && hours !== 0 ? hours = `0${hours}` : false;
	minutes < 10 && minutes !== 0 ? minutes = `0${minutes}` : false;
	sec < 10 ? sec = `0${sec}` : false;
	if (parseInt(days) > 0) {
		return `${days} days ${hours}hr ${minutes}min ${sec}sec `;
	}
	if (parseInt(hours) > 0) {
		return `${hours}:${minutes}:${sec}`;
	}
	if (parseInt(minutes) > 0) {
		return `0:${minutes}:${sec}`;
	}
	return `${sec} seconds`;
};

export const getNextAvailableWorkDay = (schedule: any) => {
	//moment().isoWeekday() will return 1-7; 1 being Monday, 7 being Sunday;
	let currentDay = moment().isoWeekday();
	//currentDay is then made equal to 0 if 7 to conform to schedule array.
	if (currentDay === 7) {
		currentDay = 0;
	}
	//Check for and return the next available day in the current week
	for (let i = currentDay; i < schedule.length; i++) {
		if (schedule[i].available) {
			const time = timeConvert(schedule[i].open);
			return { name: schedule[i].name, open: time };
		}
	}
	//Check for and return the next available day in the next week
	for (let i = 0; i < schedule.length; i++) {
		if (schedule[i].available) {
			const time = timeConvert(schedule[i].open);
			return { name: schedule[i].name, open: time };
		}
	}

	return schedule[currentDay + 1];
};

export const formatTime = (time: string) => {
	if (moment(time, "hh:mm A").isValid()) {
		return moment(time, ["h:mm A"]).format("hh:mm A");
	}
};

const timeConvert = (time) => {
	// Check correct time format and split into components
	time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

	if (time.length > 1) { // If time format correct
		time = time.slice(1);  // Remove full string match value
		time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
	}
	return time.join(""); // return adjusted time or original string
};
