import request from '@/common/request'

// 近半年帮扶记录
export async function getHelpRecord2(){
    const result = await request.get('/api/Intelligent-Community/screen/equipment/getHelpRecord2');
    return result;
}

// 党支部分类及年龄60以上人数
export async function getPartyMemberNum2(){
    const result = await request.get('/api/Intelligent-Community/screen/equipment/getPartyMemberNum2');
    return result;
}

// 隐患分类和数量
export async function getHiddenDangerClassify(){
    const result = await request.get('/api/Intelligent-Community/screen/equipment/getHiddenDangerClassify');
    return result;
}

// 设备分类及数量
export async function getEquipment(){
    const result = await request.get('/api/Intelligent-Community/screen/equipment/getEquipment');
    return result;
}

// 隐患记录
export async function getHiddenDanger(){
    const result = await request.get('/api/Intelligent-Community/screen/equipment/getHiddenDanger');
    return result;
}

// 获取天气信息
export async function getWeather(){
    const result = await request.get('https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=58467379 &appsecret=YBx4liot');
    return result;
}

// 设备位置
export async function getEquipmentLocation(){
    const result = await request.get('/api/Intelligent-Community/screen/equipment/getEquipmentLocation');
    return result;
}

// 党支部分类及人数
export async function getPartyMemberNum(){
    const result = await request.get('/api/Intelligent-Community/screen/equipment/getPartyMemberNum');
    return result;
}

// 根据日期查询近半年帮扶记录
export async function getHelpRecord3(data){
    const result = await request.get(`/api/Intelligent-Community/screen/equipment/getHelpRecord3?date=${data}`);
    return result;
}