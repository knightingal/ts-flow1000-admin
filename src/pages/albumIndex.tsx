import { api } from "@/constants";
import DefaultLayout from "@/layouts/default";
import { AlbumConfig, initConfig, PicDetail, RootState, setWindowSize } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface SlotItem {
  index: number,
  scrollOffset: number,
  itemHeight: number,
  slotIndex: number,
}

class Slot {
  totalHeight: number = 0;
  slotItemList: SlotItem[] = [];
  itemByIndex(index: number): SlotItem|undefined {
    const got: SlotItem|undefined = this.slotItemList.find(item => {
      return item.index == index;
    });
    return got;
  }
}

const minSlot = (slots: Slot[]): number => {
  let min = slots[0].totalHeight;
  let index = 0;
  for (let i = 0; i < 4; i++) {
    if (slots[i].totalHeight < min) {
      min = slots[i].totalHeight;
      index = i;
    }
  }
  return index;
} 

const SlotItemByIndex = (index: number, slots: Slot[]) => {
  for (let i = 0; i < 4; i++) {
    const item = slots[i].itemByIndex(index);
    if (item) {
      return item;
    }
  }
  return undefined;
}



const AlbumIndexPage = () => {
  const [picIndex, setPicIndex] = useState<Array<PicDetail>>([]);
  const albumConfigList = useSelector((state: RootState) => state.flow1000Config.albumConfigList);
  const albumConfigMap = new Map(albumConfigList.map(config => [config.name, config]));

  const dispatch = useDispatch()
  const [slots, setSlots] = useState<Slot[]>([]);
  useEffect(() => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    dispatch(setWindowSize({height, width}));
  }, []);
  const width = useSelector((state: RootState) => state.flow1000Content.width);

  useEffect(() => {
    if (width == 0) {
      return;
    }
    fetch(api.configList)
      .then((resp: Response) => resp.json())
      .then((json: Array<AlbumConfig>) => {
        const albumConfigs: Array<AlbumConfig> = json;
        dispatch(initConfig(albumConfigs));
        return;
      })
      .then(() => {
        return fetch(api.albumList);
      })
      .then(resp => {
        return resp.json()
      })
      .then((respJson: Array<PicDetail>) => {
        setPicIndex(respJson);
        let slot = [new Slot(), new Slot(), new Slot(), new Slot(), ];
        respJson.forEach((picDetail, index) => {
          const coverWidth = width / 4;
          const coverHeight = picDetail.coverHeight * (coverWidth / picDetail.coverWidth);

          const slotIndex = minSlot(slot);
          const slotOne = slot[slotIndex];
          slotOne.slotItemList.push({
            index: index,
            scrollOffset: slotOne.totalHeight,
            itemHeight: coverHeight,
            slotIndex: slotIndex
          });
          slotOne.totalHeight = slotOne.totalHeight + coverHeight;
        });
        setSlots(slot);

      });
  }, [width]);


  // return <DefaultLayout>
  //   <h1>AlbumnIndexPage</h1>
  //   {picIndex.map((pic => <CoverItem key={pic.index} picDetail={pic}/>))}
  // </DefaultLayout>;
  return <>
    {picIndex.map(((pic, index) => <CoverItem key={pic.index} 
      picDetail={pic} 
      albumConfigMap={albumConfigMap} 
      totalWidth={width}
      slotItem={SlotItemByIndex(index, slots) as SlotItem}/>))}
  </>;
};

const CoverItem = ({picDetail, albumConfigMap, slotItem, totalWidth}:{picDetail: PicDetail, albumConfigMap: Map<String, AlbumConfig>, slotItem: SlotItem, totalWidth: number}) => {
  if (slotItem === undefined) {
    return <></>;
  }

  const src = `http://192.168.2.12:3002/linux1000/${albumConfigMap.get(picDetail.album)?.sourcePath}/${picDetail.name}/${picDetail.cover.replace(".bin", "")}`;
  return <img 
    src={src} 
    style={{
      position: "absolute",
      top: slotItem.scrollOffset,
      left: slotItem.slotIndex * totalWidth / 4,
      width: `${totalWidth / 4}px`,
      height: `${slotItem.itemHeight}`
    }}
  ></img>
};

export default AlbumIndexPage;