import axios from 'axios';
import {getRecmdPlaylistURL} from '../axios/api'
// constant
const CARD_LIST = 'CARD_LIST';
const SCROLL_POINT = 'SCROLL_POINT';

// action creator
function cardList(list, bRequest) {
  return {
    type: CARD_LIST,
    payload: {list, bRequest}
  }
}

function scrollPoint(scrollTop) {
  return {
    type: SCROLL_POINT,
    payload: scrollTop
  }
}

// initial state
const initialState = {
  cardList: [],
  pageNum: 0,
  limit: 24,
  bRequest: true,
  scrollPoint: 0
};

// reducer
export function songcardlist(state = initialState, action) {
  switch (action.type) {
    case CARD_LIST:
      return {
        ...state,
        cardList: [...state.cardList, ...action.payload.list],
        pageNum: state.pageNum + 1,
        bRequest: !action.payload.bRequest,
      };
    case SCROLL_POINT:
      return {
        ...state,
        scrollPoint: action.payload
      };
    default:
      return state;
  }
}

// logic operation
export function getCardList(pageNum, limit, bRequest) {
  return dispatch => {
    bRequest = !bRequest;
    axios.get(getRecmdPlaylistURL(limit, pageNum)).then((res) => {
      dispatch(cardList(res.data, bRequest));
    }).catch((error) => {
      console.log(error);
    })
  }
}

export function keepScroll(scrollTop) {
  return dispatch => {
    dispatch(scrollPoint(scrollTop));
  }
}
