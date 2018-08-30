<?php
date_default_timezone_set('Asia/Shanghai');//时区
 
$time= date('Y-m-d H:i',time());//日期
$year =  date('Y',time());//日期
$month = date('m',time());//日期
$day =  date('d',time());//日期
$hour =  date('H',time());//日期
$minute = date('i',time());//日期
$second = date('s',time());//日期
$week = date('l',time()); //星期

switch ($week)
{
 case 'Monday':
	  $week = "星期一";
	  break;
 case 'Tuesday':
	  $week = "星期二";
	  break;
 case 'Wednesday':
	  $week = "星期三";
	  break;
 case 'Thursday':
	  $week = "星期四";
	  break;
 case 'Friday':
	  $week = "星期五";
	  break;
 case 'Saturday':
	  $week = "星期六";
	  break;
 case 'Sunday':
	  $week = "星期日";
	  break;
}

$date = $year.'-'.$month."-".$day.' '.$hour.':'.$minute.":".$second;
//echo '{"success":"1","date":"'.$date.'","cyclical":"'.$date.'","lunar":"'.$date.'"}';

//农历转换
class Calendar
{
#农历每月的天数
    var $everyCMonth=array(
    0=>array(8,0,0,0,0,0,0,0,0,0,0,0,29,30,7,1),
    1=>array(0,29,30,29,29,30,29,30,29,30,30,30,29,0,8,2),
    2=>array(0,30,29,30,29,29,30,29,30,29,30,30,30,0,9,3),
    3=>array(5,29,30,29,30,29,29,30,29,29,30,30,29,30,10,4),
    4=>array(0,30,30,29,30,29,29,30,29,29,30,30,29,0,1,5),
    5=>array(0,30,30,29,30,30,29,29,30,29,30,29,30,0,2,6),
    6=>array(4,29,30,30,29,30,29,30,29,30,29,30,29,30,3,7),
    7=>array(0,29,30,29,30,29,30,30,29,30,29,30,29,0,4,8),
    8=>array(0,30,29,29,30,30,29,30,29,30,30,29,30,0,5,9),
    9=>array(2,29,30,29,29,30,29,30,29,30,30,30,29,30,6,10),
    10=>array(0,29,30,29,29,30,29,30,29,30,30,30,29,0,7,11),
    11=>array(6,30,29,30,29,29,30,29,29,30,30,29,30,30,8,12),
    12=>array(0,30,29,30,29,29,30,29,29,30,30,29,30,0,9,1),
    13=>array(0,30,30,29,30,29,29,30,29,29,30,29,30,0,10,2),
    14=>array(5,30,30,29,30,29,30,29,30,29,30,29,29,30,1,3),
    15=>array(0,30,29,30,30,29,30,29,30,29,30,29,30,0,2,4),
    16=>array(0,29,30,29,30,29,30,30,29,30,29,30,29,0,3,5),
    17=>array(2,30,29,29,30,29,30,30,29,30,30,29,30,29,4,6),
    18=>array(0,30,29,29,30,29,30,29,30,30,29,30,30,0,5,7),
    19=>array(7,29,30,29,29,30,29,29,30,30,29,30,30,30,6,8),
    20=>array(0,29,30,29,29,30,29,29,30,30,29,30,30,0,7,9),
    21=>array(0,30,29,30,29,29,30,29,29,30,29,30,30,0,8,10),
    22=>array(5,30,29,30,30,29,29,30,29,29,30,29,30,30,9,11),
    23=>array(0,29,30,30,29,30,29,30,29,29,30,29,30,0,10,12),
    24=>array(0,29,30,30,29,30,30,29,30,29,30,29,29,0,1,1),
    25=>array(4,30,29,30,29,30,30,29,30,30,29,30,29,30,2,2),
    26=>array(0,29,29,30,29,30,29,30,30,29,30,30,29,0,3,3),
    27=>array(0,30,29,29,30,29,30,29,30,29,30,30,30,0,4,4),
    28=>array(2,29,30,29,29,30,29,29,30,29,30,30,30,30,5,5),
    29=>array(0,29,30,29,29,30,29,29,30,29,30,30,30,0,6,6),
    30=>array(6,29,30,30,29,29,30,29,29,30,29,30,30,29,7,7),
    31=>array(0,30,30,29,30,29,30,29,29,30,29,30,29,0,8,8),
    32=>array(0,30,30,30,29,30,29,30,29,29,30,29,30,0,9,9),
    33=>array(5,29,30,30,29,30,30,29,30,29,30,29,29,30,10,10),
    34=>array(0,29,30,29,30,30,29,30,29,30,30,29,30,0,1,11),
    35=>array(0,29,29,30,29,30,29,30,30,29,30,30,29,0,2,12),
    36=>array(3,30,29,29,30,29,29,30,30,29,30,30,30,29,3,1),
    37=>array(0,30,29,29,30,29,29,30,29,30,30,30,29,0,4,2),
    38=>array(7,30,30,29,29,30,29,29,30,29,30,30,29,30,5,3),
    39=>array(0,30,30,29,29,30,29,29,30,29,30,29,30,0,6,4),
    40=>array(0,30,30,29,30,29,30,29,29,30,29,30,29,0,7,5),
    41=>array(6,30,30,29,30,30,29,30,29,29,30,29,30,29,8,6),
    42=>array(0,30,29,30,30,29,30,29,30,29,30,29,30,0,9,7),
    43=>array(0,29,30,29,30,29,30,30,29,30,29,30,29,0,10,8),
    44=>array(4,30,29,30,29,30,29,30,29,30,30,29,30,30,1,9),
    45=>array(0,29,29,30,29,29,30,29,30,30,30,29,30,0,2,10),
    46=>array(0,30,29,29,30,29,29,30,29,30,30,29,30,0,3,11),
    47=>array(2,30,30,29,29,30,29,29,30,29,30,29,30,30,4,12),
    48=>array(0,30,29,30,29,30,29,29,30,29,30,29,30,0,5,1),
    49=>array(7,30,29,30,30,29,30,29,29,30,29,30,29,30,6,2),
    50=>array(0,29,30,30,29,30,30,29,29,30,29,30,29,0,7,3),
    51=>array(0,30,29,30,30,29,30,29,30,29,30,29,30,0,8,4),
    52=>array(5,29,30,29,30,29,30,29,30,30,29,30,29,30,9,5),
    53=>array(0,29,30,29,29,30,30,29,30,30,29,30,29,0,10,6),
    54=>array(0,30,29,30,29,29,30,29,30,30,29,30,30,0,1,7),
    55=>array(3,29,30,29,30,29,29,30,29,30,29,30,30,30,2,8),
    56=>array(0,29,30,29,30,29,29,30,29,30,29,30,30,0,3,9),
    57=>array(8,30,29,30,29,30,29,29,30,29,30,29,30,29,4,10),
    58=>array(0,30,30,30,29,30,29,29,30,29,30,29,30,0,5,11),
    59=>array(0,29,30,30,29,30,29,30,29,30,29,30,29,0,6,12),
    60=>array(6,30,29,30,29,30,30,29,30,29,30,29,30,29,7,1),
    61=>array(0,30,29,30,29,30,29,30,30,29,30,29,30,0,8,2),
    62=>array(0,29,30,29,29,30,29,30,30,29,30,30,29,0,9,3),
    63=>array(4,30,29,30,29,29,30,29,30,29,30,30,30,29,10,4),
    64=>array(0,30,29,30,29,29,30,29,30,29,30,30,30,0,1,5),
    65=>array(0,29,30,29,30,29,29,30,29,29,30,30,29,0,2,6),
    66=>array(3,30,30,30,29,30,29,29,30,29,29,30,30,29,3,7),
    67=>array(0,30,30,29,30,30,29,29,30,29,30,29,30,0,4,8),
    68=>array(7,29,30,29,30,30,29,30,29,30,29,30,29,30,5,9),
    69=>array(0,29,30,29,30,29,30,30,29,30,29,30,29,0,6,10),
    70=>array(0,30,29,29,30,29,30,30,29,30,30,29,30,0,7,11),
    71=>array(5,29,30,29,29,30,29,30,29,30,30,30,29,30,8,12),
    72=>array(0,29,30,29,29,30,29,30,29,30,30,29,30,0,9,1),
    73=>array(0,30,29,30,29,29,30,29,29,30,30,29,30,0,10,2),
    74=>array(4,30,30,29,30,29,29,30,29,29,30,30,29,30,1,3),
    75=>array(0,30,30,29,30,29,29,30,29,29,30,29,30,0,2,4),
    76=>array(8,30,30,29,30,29,30,29,30,29,29,30,29,30,3,5),
    77=>array(0,30,29,30,30,29,30,29,30,29,30,29,29,0,4,6),
    78=>array(0,30,29,30,30,29,30,30,29,30,29,30,29,0,5,7),
    79=>array(6,30,29,29,30,29,30,30,29,30,30,29,30,29,6,8),
    80=>array(0,30,29,29,30,29,30,29,30,30,29,30,30,0,7,9),
    81=>array(0,29,30,29,29,30,29,29,30,30,29,30,30,0,8,10),
    82=>array(4,30,29,30,29,29,30,29,29,30,29,30,30,30,9,11),
    83=>array(0,30,29,30,29,29,30,29,29,30,29,30,30,0,10,12),
    84=>array(10,30,29,30,30,29,29,30,29,29,30,29,30,30,1,1),
    85=>array(0,29,30,30,29,30,29,30,29,29,30,29,30,0,2,2),
    86=>array(0,29,30,30,29,30,30,29,30,29,30,29,29,0,3,3),
    87=>array(6,30,29,30,29,30,30,29,30,30,29,30,29,29,4,4),
    88=>array(0,30,29,30,29,30,29,30,30,29,30,30,29,0,5,5),
    89=>array(0,30,29,29,30,29,29,30,30,29,30,30,30,0,6,6),
    90=>array(5,29,30,29,29,30,29,29,30,29,30,30,30,30,7,7),
    91=>array(0,29,30,29,29,30,29,29,30,29,30,30,30,0,8,8),
    92=>array(0,29,30,30,29,29,30,29,29,30,29,30,30,0,9,9),
    93=>array(3,29,30,30,29,30,29,30,29,29,30,29,30,29,10,10),
    94=>array(0,30,30,30,29,30,29,30,29,29,30,29,30,0,1,11),
    95=>array(8,29,30,30,29,30,29,30,30,29,29,30,29,30,2,12),
    96=>array(0,29,30,29,30,30,29,30,29,30,30,29,29,0,3,1),
    97=>array(0,30,29,30,29,30,29,30,30,29,30,30,29,0,4,2),
    98=>array(5,30,29,29,30,29,29,30,30,29,30,30,29,30,5,3),
    99=>array(0,30,29,29,30,29,29,30,29,30,30,30,29,0,6,4),
    100=>array(0,30,30,29,29,30,29,29,30,29,30,30,29,0,7,5),
    101=>array(4,30,30,29,30,29,30,29,29,30,29,30,29,30,8,6),
    102=>array(0,30,30,29,30,29,30,29,29,30,29,30,29,0,9,7),
    103=>array(0,30,30,29,30,30,29,30,29,29,30,29,30,0,10,8),
    104=>array(2,29,30,29,30,30,29,30,29,30,29,30,29,30,1,9),
    105=>array(0,29,30,29,30,29,30,30,29,30,29,30,29,0,2,10),
    106=>array(7,30,29,30,29,30,29,30,29,30,30,29,30,30,3,11),
    107=>array(0,29,29,30,29,29,30,29,30,30,30,29,30,0,4,12),
    108=>array(0,30,29,29,30,29,29,30,29,30,30,29,30,0,5,1),
    109=>array(5,30,30,29,29,30,29,29,30,29,30,29,30,30,6,2),
    110=>array(0,30,29,30,29,30,29,29,30,29,30,29,30,0,7,3),
    111=>array(0,30,29,30,30,29,30,29,29,30,29,30,29,0,8,4),
    112=>array(4,30,29,30,30,29,30,29,30,29,30,29,30,29,9,5),
    113=>array(0,30,29,30,29,30,30,29,30,29,30,29,30,0,10,6),
    114=>array(9,29,30,29,30,29,30,29,30,30,29,30,29,30,1,7),
    115=>array(0,29,30,29,29,30,29,30,30,30,29,30,29,0,2,8),
    116=>array(0,30,29,30,29,29,30,29,30,30,29,30,30,0,3,9),
    117=>array(6,29,30,29,30,29,29,30,29,30,29,30,30,30,4,10),
    118=>array(0,29,30,29,30,29,29,30,29,30,29,30,30,0,5,11),
    119=>array(0,30,29,30,29,30,29,29,30,29,29,30,30,0,6,12),
    120=>array(4,29,30,30,30,29,30,29,29,30,29,30,29,30,7,1)
    );
##############################
#农历天干

    var $mten=array("null","甲","乙","丙","丁","戊","己","庚","辛","壬","癸");    #农历地支
    var $mtwelve=array("null","子(鼠)","丑(牛)","寅(虎)","卯(兔)","辰(龙)",
                   "巳(蛇)","午(马)","未(羊)","申(猴)","酉(鸡)","戌(狗)","亥(猪)");    #农历月份
    var $mmonth=array("闰","正","二","三","四","五","六",
                  "七","八","九","十","十一","十二","月");
    var $mday=array("null","初一","初二","初三","初四","初五","初六","初七","初八","初九","初十",
                "十一","十二","十三","十四","十五","十六","十七","十八","十九","二十",
                "廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十");#农历日
##############################
#赋给初值
#天干地支
    var $ten=0;
    var $twelve=0;
    function MyPub($cYear,$cMonth,$cDay)
    {
        $total=11;#阳历总天数 至1900年12月21日   
        $mtotal=0;#阴历总天数
        for ($y=1901;$y<$cYear;$y++)
        {
            $total+=365;
            if ($y%4==0) $total ++;
        }
        #再加当年的几个月
        switch ($cMonth){
                 case 12:
                      $total+=30;
                 case 11:
                      $total+=31;
                 case 10:
                      $total+=30;
                 case 9:
                      $total+=31;
                 case 8:
                      $total+=31;
                 case 7:
                      $total+=30;
                 case 6:
                      $total+=31;
                 case 5:
                      $total+=30;
                 case 4:
                      $total+=31;
                 case 3:
                      $total+=28;
                 case 2:
                      $total+=31;
               }

            #如果当年是闰年还要加一天
            if ($cYear%4==0 and $cMonth>2)
            {
                $total++;
            }

            $total+=$cDay-1;

            ##############################
            #用农历的天数累加来判断是否超过阳历的天数
            for($j=0;$j<=120;$j++)
            {
                $i=1;
                for($i=1;$i<=13;$i++)
                {
                    $mtotal+=$this->everyCMonth[$j][$i];
                    if ($mtotal>=$total)
                    {
                        $flag=1;
                        break;
                    }
                }
                if ($flag==1)break;
            }
                    return array("m"=>$j,"d"=>$i,"t"=>$total,"n"=>$mtotal);
    }
    function Cal($Year,$Month,$Day)
    {
        $Par=$this->MyPub($Year,$Month,$Day);

        $md=$this->everyCMonth[$Par["m"]][$Par["d"]]-($Par["n"]-$Par["t"]);
        $week=($Par["t"]+5)%7;
        if ($this->everyCMonth[$Par["m"]][0]<>0 and $this->everyCMonth[$Par["m"]][0]<$Par["d"])
        {
                $mm=$Par["d"]-1;
        }else{
                $mm=$Par["d"];
        }
        if ($Par["d"]==$this->everyCMonth[$Par["d"]][0]+1 and $this->everyCMonth[$Par["d"]][0]<>0)
        {
            $cMonth=$this->mmonth[0].$this->mmonth[$mm];#闰月
        }else{
            $cMonth=$this->mmonth[$mm].$this->mmonth[13];
        }
        return array("year"=>$this->mten[$this->everyCMonth[$Par["m"]][14]].$this->mtwelve[$this->everyCMonth[$Par["m"]][15]],
                    "month"=>$cMonth,
                    "day"=>$this->mday[$md],
                    "week"=>$week);
    }
}
/////调用
error_reporting(1);
$test=new Calendar;
$Year=$test->Cal($year,$month,$day);
//echo $Year["year"]." ".$Year["month"].$Year["day"];
echo '{"success":"1","date":"'.$date.'","week":"'.$week.'","cyclical":"'.$Year["year"].'","lunar":"'.$Year["month"].$Year["day"].'"}';
?>