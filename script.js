// ─── CONFIG ────────────────────────────────────────────

const PROXY = '/api/proxy?url=';



// ─── TODAS LAS ESTACIONES RENFE (1070) ────────────────
const RENFE_STATIONS = [{"c":"01003","n":"ARAHAL","la":37.268081,"lo":-5.548514,"ce":"NO","fe":"NO","co":"","po":"ARAHAL","pr":"SEVILLA"},{"c":"01005","n":"MARCHENA","la":37.334282,"lo":-5.425519,"ce":"NO","fe":"NO","co":"","po":"MARCHENA","pr":"SEVILLA"},{"c":"01007","n":"OSUNA","la":37.233899,"lo":-5.115026,"ce":"NO","fe":"NO","co":"","po":"OSUNA","pr":"SEVILLA"},{"c":"01009","n":"PEDRERA","la":37.222396,"lo":-4.893519,"ce":"NO","fe":"NO","co":"","po":"PEDRERA","pr":"SEVILLA"},{"c":"02002","n":"PUENTE GENIL-HERRERA","la":37.3579,"lo":-4.821638,"ce":"NO","fe":"NO","co":"PTE G","po":"PUENTE GENIL","pr":"CÓRDOBA"},{"c":"02003","n":"ANTEQUERA-SANTA ANA","la":37.069881,"lo":-4.719014,"ce":"NO","fe":"NO","co":"ANTEQ","po":"ANTEQUERA","pr":"MÁLAGA"},{"c":"02030","n":"ANTEQUERA AV","la":37.0334437,"lo":-4.5612901,"ce":"NO","fe":"NO","co":"ANTEQ","po":"ANTEQUERA","pr":"MÁLAGA"},{"c":"03001","n":"MENGÍBAR-ARTICHUELA","la":37.978219,"lo":-3.803308,"ce":"NO","fe":"NO","co":"","po":"MENGÍBAR","pr":"JAÉN"},{"c":"03100","n":"JAÉN","la":37.779827,"lo":-3.790798,"ce":"NO","fe":"NO","co":"","po":"JAÉN","pr":"JAÉN"},{"c":"03208","n":"CUENCA-FERNANDO ZÓBEL","la":40.035192,"lo":-2.14441,"ce":"NO","fe":"NO","co":"CUENC","po":"CUENCA","pr":"CUENCA"},{"c":"03213","n":"REQUENA-UTIEL","la":39.519834,"lo":-1.127601,"ce":"NO","fe":"NO","co":"","po":"REQUENA","pr":"VALENCIA/VALÈNCIA"},{"c":"03216","n":"VALÈNCIA-JOAQUÍN SOROLLA","la":39.459051,"lo":-0.382923,"ce":"SI","fe":"NO","co":"VALEN","po":"VALENCIA","pr":"VALENCIA/VALÈNCIA"},{"c":"03309","n":"VILLENA ALTA VELOCIDAD","la":38.585302,"lo":-0.873295,"ce":"SI","fe":"NO","co":"","po":"VILLENA","pr":"ALICANTE/ALACANT"},{"c":"03410","n":"ELCHE/ELX AV","la":38.24551,"lo":-0.76675,"ce":"SI","fe":"NO","co":"","po":"ELCHE/ELX","pr":"ALICANTE/ALACANT"},{"c":"03412","n":"CALLOSA DE SEGURA-COX","la":38.1227708,"lo":-0.8745727,"ce":"SI","fe":"NO","co":"","po":"CALLOSA DE SEGURA","pr":"ALICANTE/ALACANT"},{"c":"04007","n":"GUADALAJARA-YEBES","la":40.587315,"lo":-3.124301,"ce":"NO","fe":"NO","co":"GUADA","po":"YEBES","pr":"GUADALAJARA"},{"c":"04040","n":"ZARAGOZA DELICIAS","la":41.6586576,"lo":-0.9112693,"ce":"SI","fe":"NO","co":"ZARAG","po":"ZARAGOZA","pr":"ZARAGOZA"},{"c":"04104","n":"CAMP DE TARRAGONA","la":41.192066,"lo":1.272666,"ce":"SI","fe":"NO","co":"TARRA","po":"TARRAGONA","pr":"TARRAGONA"},{"c":"04307","n":"FIGUERES-VILAFANT","la":42.264771,"lo":2.943547,"ce":"NO","fe":"NO","co":"","po":"VILAFANT","pr":"GIRONA"},{"c":"05000","n":"GRANADA","la":37.184038,"lo":-3.609154,"ce":"NO","fe":"NO","co":"","po":"GRANADA","pr":"GRANADA"},{"c":"05012","n":"LOJA","la":37.175372,"lo":-4.134841,"ce":"NO","fe":"NO","co":"","po":"LOJA","pr":"GRANADA"},{"c":"05102","n":"SAN XOÁN","la":43.4945654,"lo":-8.2142733,"ce":"SI","fe":"SI","co":"","po":"FERROL","pr":"CORUÑA, A"},{"c":"05103","n":"SANTA ICÍA","la":43.4997707,"lo":-8.1999226,"ce":"SI","fe":"SI","co":"","po":"NARÓN","pr":"CORUÑA, A"},{"c":"05104","n":"VIRXE DO MAR","la":43.4965254,"lo":-8.2048752,"ce":"SI","fe":"SI","co":"","po":"NARÓN","pr":"CORUÑA, A"},{"c":"05105","n":"PIÑEIROS","la":43.509483,"lo":-8.1839923,"ce":"SI","fe":"SI","co":"","po":"NARÓN","pr":"CORUÑA, A"},{"c":"05106","n":"O PONTO","la":43.5147757,"lo":-8.1777808,"ce":"SI","fe":"SI","co":"","po":"NARÓN","pr":"CORUÑA, A"},{"c":"05107","n":"XUVIA","la":43.5171911,"lo":-8.161282,"ce":"SI","fe":"SI","co":"","po":"NARÓN","pr":"CORUÑA, A"},{"c":"05108","n":"O ALTO DO CASTIÑEIRO","la":43.5031794,"lo":-8.1955484,"ce":"SI","fe":"SI","co":"","po":"NARÓN","pr":"CORUÑA, A"},{"c":"05109","n":"FERRERÍAS","la":43.5280178,"lo":-8.1504359,"ce":"SI","fe":"SI","co":"","po":"NARÓN","pr":"CORUÑA, A"},{"c":"05111","n":"SEDES","la":43.5426113,"lo":-8.1401903,"ce":"SI","fe":"SI","co":"","po":"NARÓN","pr":"CORUÑA, A"},{"c":"05113","n":"PEDROSO DE NARÓN","la":43.5367071,"lo":-8.1091931,"ce":"SI","fe":"SI","co":"","po":"NARÓN","pr":"CORUÑA, A"},{"c":"05115","n":"SAN SADURNIÑO","la":43.5460838,"lo":-8.0781099,"ce":"SI","fe":"SI","co":"","po":"SAN SADURNIÑO","pr":"CORUÑA, A"},{"c":"05117","n":"LAMAS","la":43.5473064,"lo":-8.0490166,"ce":"SI","fe":"SI","co":"","po":"SAN SADURNIÑO","pr":"CORUÑA, A"},{"c":"05119","n":"APALLA","la":43.550457,"lo":-8.0186188,"ce":"SI","fe":"SI","co":"","po":"SAN SADURNIÑO","pr":"CORUÑA, A"},{"c":"05121","n":"MOECHE","la":43.562132,"lo":-8.0027572,"ce":"SI","fe":"SI","co":"","po":"MOECHE","pr":"CORUÑA, A"},{"c":"05123","n":"LABACENGOS","la":43.5652707,"lo":-7.9801882,"ce":"SI","fe":"SI","co":"","po":"MOECHE","pr":"CORUÑA, A"},{"c":"05125","n":"ENTRAMBARRÍAS","la":43.5770633,"lo":-7.9542644,"ce":"SI","fe":"SI","co":"","po":"MOECHE","pr":"CORUÑA, A"},{"c":"05127","n":"CERDIDO","la":43.5873426,"lo":-7.9343099,"ce":"SI","fe":"SI","co":"","po":"CERDIDO","pr":"CORUÑA, A"},{"c":"05129","n":"A CUQUEIRA","la":43.6078292,"lo":-7.9219389,"ce":"SI","fe":"SI","co":"","po":"CERDIDO","pr":"CORUÑA, A"},{"c":"05131","n":"SANTA MARÍA DE MERA","la":43.6409288,"lo":-7.9161904,"ce":"SI","fe":"SI","co":"","po":"ORTIGUEIRA","pr":"CORUÑA, A"},{"c":"05133","n":"PONTE MERA","la":43.666038,"lo":-7.9026205,"ce":"SI","fe":"SI","co":"","po":"ORTIGUEIRA","pr":"CORUÑA, A"},{"c":"05135","n":"SAN CLODIO","la":43.6609443,"lo":-7.873478,"ce":"SI","fe":"SI","co":"","po":"RIBAS DE SIL","pr":"CORUÑA, A"},{"c":"05137","n":"SENRA","la":43.668793,"lo":-7.8545534,"ce":"SI","fe":"SI","co":"","po":"ORTIGUEIRA","pr":"CORUÑA, A"},{"c":"05139","n":"ORTIGUEIRA","la":43.6862217,"lo":-7.8495738,"ce":"SI","fe":"SI","co":"","po":"ORTIGUEIRA","pr":"CORUÑA, A"},{"c":"05141","n":"ESPASANTE","la":43.70888,"lo":-7.804897,"ce":"NO","fe":"SI","co":"","po":"ORTIGUEIRA","pr":"CORUÑA, A"},{"c":"05143","n":"LOIBA","la":43.730393,"lo":-7.750044,"ce":"NO","fe":"SI","co":"","po":"ORTIGUEIRA","pr":"CORUÑA, A"},{"c":"05145","n":"O BARQUEIRO","la":43.735649,"lo":-7.70288,"ce":"NO","fe":"SI","co":"","po":"MAÑÓN","pr":"CORUÑA, A"},{"c":"05147","n":"O VICEDO","la":43.731026,"lo":-7.673215,"ce":"NO","fe":"SI","co":"","po":"VICEDO (O)","pr":"LUGO"},{"c":"05149","n":"MOSENDE","la":43.706194,"lo":-7.635477,"ce":"NO","fe":"SI","co":"","po":"VICEDO (O)","pr":"LUGO"},{"c":"05151","n":"FOLGUEIRO","la":43.692766,"lo":-7.635048,"ce":"NO","fe":"SI","co":"","po":"VICEDO (O)","pr":"LUGO"},{"c":"05153","n":"COVAS DE VIVEIRO","la":43.670275,"lo":-7.614613,"ce":"NO","fe":"SI","co":"","po":"VIVEIRO","pr":"LUGO"},{"c":"05155","n":"VIVEIRO","la":43.6569,"lo":-7.60033,"ce":"NO","fe":"SI","co":"","po":"VIVEIRO","pr":"LUGO"},{"c":"05156","n":"VIVEIRO APEADERO","la":43.661435,"lo":-7.594532,"ce":"NO","fe":"SI","co":"","po":"VIVEIRO","pr":"LUGO"},{"c":"05157","n":"XUANCES","la":43.687991,"lo":-7.553904,"ce":"NO","fe":"SI","co":"","po":"XOVE","pr":"LUGO"},{"c":"05159","n":"XOVE POBO","la":43.683567,"lo":-7.510921,"ce":"NO","fe":"SI","co":"","po":"XOVE","pr":"LUGO"},{"c":"05161","n":"XOVE","la":43.681138,"lo":-7.495251,"ce":"NO","fe":"SI","co":"","po":"XOVE","pr":"LUGO"},{"c":"05163","n":"LAGO","la":43.687108,"lo":-7.481942,"ce":"NO","fe":"SI","co":"","po":"XOVE","pr":"LUGO"},{"c":"05165","n":"BIDUEIROS","la":43.696712,"lo":-7.468843,"ce":"NO","fe":"SI","co":"","po":"CERVO","pr":"LUGO"},{"c":"05167","n":"SAN CIBRAO","la":43.692319,"lo":-7.44177,"ce":"NO","fe":"SI","co":"","po":"CERVO","pr":"LUGO"},{"c":"05169","n":"MADEIRO","la":43.686219,"lo":-7.412863,"ce":"NO","fe":"SI","co":"","po":"CERVO","pr":"LUGO"},{"c":"05171","n":"BURELA","la":43.660607,"lo":-7.361183,"ce":"NO","fe":"SI","co":"","po":"BURELA","pr":"LUGO"},{"c":"05173","n":"CANGAS DE FOZ","la":43.626106,"lo":-7.333309,"ce":"NO","fe":"SI","co":"","po":"FOZ","pr":"LUGO"},{"c":"05175","n":"NOIS","la":43.610309,"lo":-7.312222,"ce":"NO","fe":"SI","co":"","po":"FOZ","pr":"LUGO"},{"c":"05177","n":"FAZOURO","la":43.600457,"lo":-7.299843,"ce":"NO","fe":"SI","co":"","po":"FOZ","pr":"LUGO"},{"c":"05179","n":"MARZÁN","la":43.57475,"lo":-7.26936,"ce":"NO","fe":"SI","co":"","po":"FOZ","pr":"LUGO"},{"c":"05181","n":"FOZ","la":43.560886,"lo":-7.272235,"ce":"NO","fe":"SI","co":"","po":"FOZ","pr":"LUGO"},{"c":"05183","n":"BARREIROS","la":43.547366,"lo":-7.225287,"ce":"NO","fe":"SI","co":"","po":"BARREIROS","pr":"LUGO"},{"c":"05185","n":"REINANTE","la":43.54987,"lo":-7.174315,"ce":"NO","fe":"SI","co":"","po":"BARREIROS","pr":"LUGO"},{"c":"05187","n":"ESTEIRO","la":43.551697,"lo":-7.146099,"ce":"NO","fe":"SI","co":"","po":"RIBADEO","pr":"LUGO"},{"c":"05189","n":"OS CASTROS","la":43.55157,"lo":-7.130895,"ce":"NO","fe":"SI","co":"","po":"RIBADEO","pr":"LUGO"},{"c":"05191","n":"RINLO","la":43.549761,"lo":-7.108645,"ce":"NO","fe":"SI","co":"","po":"RIBADEO","pr":"LUGO"},{"c":"05193","n":"RIBADEO","la":43.53607,"lo":-7.055572,"ce":"NO","fe":"SI","co":"","po":"RIBADEO","pr":"LUGO"},{"c":"05197","n":"VEGADEO PUEBLO","la":43.479667,"lo":-7.057327,"ce":"NO","fe":"SI","co":"","po":"VEGADEO","pr":"ASTURIAS"},{"c":"05199","n":"VILAVEDELLE","la":43.490502,"lo":-7.038353,"ce":"NO","fe":"SI","co":"","po":"CASTROPOL","pr":"ASTURIAS"},{"c":"05239","n":"SANTIANES","la":43.503799,"lo":-6.0918391,"ce":"SI","fe":"SI","co":"","po":"PRAVIA","pr":"ASTURIAS"},{"c":"05241","n":"LOS CABOS","la":43.5124147,"lo":-6.0974746,"ce":"SI","fe":"SI","co":"","po":"PRAVIA","pr":"ASTURIAS"},{"c":"05243","n":"MUROS DEL NALÓN","la":43.5429728,"lo":-6.1110718,"ce":"SI","fe":"SI","co":"","po":"MUROS DE NALÓN","pr":"ASTURIAS"},{"c":"05244","n":"EL PITO PIÑERA","la":43.5469091,"lo":-6.1433417,"ce":"SI","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05245","n":"CUDILLERO","la":43.5509259,"lo":-6.1519305,"ce":"SI","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05247","n":"VILLADEMAR","la":43.557065,"lo":-6.155477,"ce":"NO","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05249","n":"LA MAGDALENA","la":43.559309,"lo":-6.184922,"ce":"NO","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05251","n":"SAN MARTÍN DE LUIÑA","la":43.544753,"lo":-6.228702,"ce":"NO","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05253","n":"SAN COSME","la":43.544069,"lo":-6.248091,"ce":"NO","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05255","n":"SOTO DE LUIÑA","la":43.559635,"lo":-6.234369,"ce":"NO","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05257","n":"VALDREDO","la":43.56638,"lo":-6.263234,"ce":"NO","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05259","n":"NOVELLANA","la":43.557795,"lo":-6.289593,"ce":"NO","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05261","n":"SANTA MARINA","la":43.552674,"lo":-6.305181,"ce":"NO","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05263","n":"BALLOTA","la":43.550716,"lo":-6.322812,"ce":"NO","fe":"SI","co":"","po":"CUDILLERO","pr":"ASTURIAS"},{"c":"05265","n":"TABLIZO","la":43.547253,"lo":-6.351225,"ce":"NO","fe":"SI","co":"","po":"VALDÉS","pr":"ASTURIAS"},{"c":"05267","n":"CADAVEDO","la":43.542952,"lo":-6.391612,"ce":"NO","fe":"SI","co":"","po":"VALDÉS","pr":"ASTURIAS"},{"c":"05269","n":"SAN CRISTÓBAL","la":43.547225,"lo":-6.415264,"ce":"NO","fe":"SI","co":"","po":"VALDÉS","pr":"ASTURIAS"},{"c":"05271","n":"CANERO","la":43.541913,"lo":-6.445878,"ce":"NO","fe":"SI","co":"","po":"VALDÉS","pr":"ASTURIAS"},{"c":"05273","n":"BARCIA","la":43.546813,"lo":-6.50828,"ce":"NO","fe":"SI","co":"","po":"VALDÉS","pr":"ASTURIAS"},{"c":"05275","n":"LUARCA","la":43.537949,"lo":-6.536617,"ce":"NO","fe":"SI","co":"","po":"VALDÉS","pr":"ASTURIAS"},{"c":"05277","n":"OTUR","la":43.540541,"lo":-6.593562,"ce":"NO","fe":"SI","co":"","po":"VALDÉS","pr":"ASTURIAS"},{"c":"05279","n":"VILLAPEDRE","la":43.546723,"lo":-6.64587,"ce":"NO","fe":"SI","co":"","po":"NAVIA","pr":"ASTURIAS"},{"c":"05281","n":"PIÑERA-VILLAORIL","la":43.535685,"lo":-6.685414,"ce":"NO","fe":"SI","co":"","po":"NAVIA","pr":"ASTURIAS"},{"c":"05283","n":"NAVIA","la":43.536802,"lo":-6.719425,"ce":"NO","fe":"SI","co":"","po":"NAVIA","pr":"ASTURIAS"},{"c":"05285","n":"MEDAL","la":43.545692,"lo":-6.752994,"ce":"NO","fe":"SI","co":"","po":"COAÑA","pr":"ASTURIAS"},{"c":"05287","n":"LOZA","la":43.551254,"lo":-6.771675,"ce":"NO","fe":"SI","co":"","po":"COAÑA","pr":"ASTURIAS"},{"c":"05289","n":"CARTAVIO","la":43.550714,"lo":-6.789622,"ce":"NO","fe":"SI","co":"","po":"COAÑA","pr":"ASTURIAS"},{"c":"05291","n":"LA CARIDAD","la":43.547074,"lo":-6.827541,"ce":"NO","fe":"SI","co":"","po":"FRANCO (EL)","pr":"ASTURIAS"},{"c":"05293","n":"TAPIA","la":43.535026,"lo":-6.909329,"ce":"NO","fe":"SI","co":"","po":"TAPIA DE CASARIEGO","pr":"ASTURIAS"},{"c":"05295","n":"TOL","la":43.527204,"lo":-6.952128,"ce":"NO","fe":"SI","co":"","po":"CASTROPOL","pr":"ASTURIAS"},{"c":"05297","n":"LAS CAMPAS DE CASTROPOL","la":43.5202979,"lo":-6.9771022,"ce":"NO","fe":"SI","co":"","po":"CASTROPOL","pr":"ASTURIAS"},{"c":"05299","n":"CASTROPOL","la":43.5095861,"lo":-7.0147697,"ce":"NO","fe":"SI","co":"","po":"CASTROPOL","pr":"ASTURIAS"},{"c":"05300","n":"VALLOBÍN","la":43.3652306,"lo":-5.8647984,"ce":"SI","fe":"SI","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"05301","n":"ARGAÑOSA-LAVAPIÉS","la":43.3658311,"lo":-5.870018,"ce":"SI","fe":"SI","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"05302","n":"LAS CAMPAS","la":43.3638889,"lo":-5.8833728,"ce":"SI","fe":"SI","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"05303","n":"LAS MAZAS","la":43.3587192,"lo":-5.8975568,"ce":"SI","fe":"SI","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"05304","n":"SAN CLAUDIO","la":43.3553535,"lo":-5.9178091,"ce":"SI","fe":"SI","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"05306","n":"SAN PEDRO DE NORA","la":43.3687481,"lo":-5.9585951,"ce":"SI","fe":"SI","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"05308","n":"SOTO UDRIÓN","la":43.3564364,"lo":-5.9650157,"ce":"SI","fe":"SI","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"05311","n":"TRUBIA","la":43.34857,"lo":-5.9677756,"ce":"SI","fe":"SI","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"05313","n":"SANTA MARÍA DE GRADO","la":43.3842274,"lo":-5.9827075,"ce":"SI","fe":"SI","co":"","po":"GRADO","pr":"ASTURIAS"},{"c":"05315","n":"VEGA DE ANZO","la":43.38933,"lo":-6.0056834,"ce":"SI","fe":"SI","co":"","po":"GRADO","pr":"ASTURIAS"},{"c":"05316","n":"PEÑAFLOR DE GRADO","la":43.4029267,"lo":-6.0453921,"ce":"SI","fe":"SI","co":"","po":"GRADO","pr":"ASTURIAS"},{"c":"05317","n":"GRADO","la":43.3945424,"lo":-6.0637254,"ce":"SI","fe":"SI","co":"","po":"GRADO","pr":"ASTURIAS"},{"c":"05319","n":"SANDICHE","la":43.4256226,"lo":-6.0599341,"ce":"SI","fe":"SI","co":"","po":"CANDAMO","pr":"ASTURIAS"},{"c":"05320","n":"ACES","la":43.4399142,"lo":-6.0657983,"ce":"SI","fe":"SI","co":"","po":"CANDAMO","pr":"ASTURIAS"},{"c":"05321","n":"SAN ROMÁN","la":43.4488839,"lo":-6.0771641,"ce":"SI","fe":"SI","co":"","po":"CANDAMO","pr":"ASTURIAS"},{"c":"05323","n":"BEIFAR","la":43.4701379,"lo":-6.0988707,"ce":"SI","fe":"SI","co":"","po":"PRAVIA","pr":"ASTURIAS"},{"c":"05325","n":"PRAVIA","la":43.4908983,"lo":-6.1105373,"ce":"SI","fe":"SI","co":"","po":"PRAVIA","pr":"ASTURIAS"},{"c":"05451","n":"BILBAO LA CONCORDIA","la":43.2601901,"lo":-2.9263839,"ce":"SI","fe":"SI","co":"","po":"BILBAO","pr":"BIZKAIA"},{"c":"05455","n":"BASURTO HOSPITAL","la":43.2597699,"lo":-2.9538267,"ce":"SI","fe":"SI","co":"","po":"BILBAO","pr":"BIZKAIA"},{"c":"05457","n":"ZORROTZA ZORROZGOITI","la":43.2740398,"lo":-2.9740116,"ce":"SI","fe":"SI","co":"","po":"BILBAO","pr":"BIZKAIA"},{"c":"05459","n":"SANTA ÁGUEDA","la":43.261857,"lo":-2.9730218,"ce":"SI","fe":"SI","co":"","po":"BILBAO","pr":"BIZKAIA"},{"c":"05460","n":"KASTREXANA","la":43.2554758,"lo":-2.9721445,"ce":"SI","fe":"SI","co":"","po":"BILBAO","pr":"BIZKAIA"},{"c":"05461","n":"IRAUREGUI","la":43.248418,"lo":-2.9900734,"ce":"SI","fe":"SI","co":"","po":"ALONSOTEGI","pr":"BIZKAIA"},{"c":"05463","n":"ZARAMILLO","la":43.2332894,"lo":-3.015904,"ce":"SI","fe":"SI","co":"","po":"GÜEÑES","pr":"BIZKAIA"},{"c":"05465","n":"LA QUADRA","la":43.222723,"lo":-3.0249848,"ce":"SI","fe":"SI","co":"","po":"GÜEÑES","pr":"BIZKAIA"},{"c":"05467","n":"SODUPE","la":43.2020301,"lo":-3.050517,"ce":"SI","fe":"SI","co":"","po":"GÜEÑES","pr":"BIZKAIA"},{"c":"05469","n":"ARTXUBE","la":43.200993,"lo":-3.0715031,"ce":"SI","fe":"SI","co":"","po":"GÜEÑES","pr":"BIZKAIA"},{"c":"05470","n":"LAMBARRI","la":43.2060733,"lo":-3.0825107,"ce":"SI","fe":"SI","co":"","po":"GÜEÑES","pr":"BIZKAIA"},{"c":"05471","n":"GÜEÑES","la":43.2090276,"lo":-3.0952113,"ce":"SI","fe":"SI","co":"","po":"GÜEÑES","pr":"BIZKAIA"},{"c":"05473","n":"ARANGUREN","la":43.2104561,"lo":-3.108399,"ce":"SI","fe":"SI","co":"","po":"ZALLA","pr":"BIZKAIA"},{"c":"05474","n":"ARANGUREN-APEADERO","la":43.2103517,"lo":-3.1140505,"ce":"SI","fe":"SI","co":"","po":"ZALLA","pr":"BIZKAIA"},{"c":"05475","n":"ZALLA","la":43.2129096,"lo":-3.1333368,"ce":"SI","fe":"SI","co":"","po":"ZALLA","pr":"BIZKAIA"},{"c":"05477","n":"COLEGIO","la":43.2112674,"lo":-3.1381409,"ce":"SI","fe":"SI","co":"","po":"ZALLA","pr":"BIZKAIA"},{"c":"05479","n":"IBARRA","la":43.203959,"lo":-3.1448388,"ce":"SI","fe":"SI","co":"","po":"ZALLA","pr":"BIZKAIA"},{"c":"05481","n":"LA HERRERA","la":43.2034521,"lo":-3.1705687,"ce":"SI","fe":"SI","co":"","po":"ZALLA","pr":"BIZKAIA"},{"c":"05483","n":"BALMASEDA","la":43.1963551,"lo":-3.1899562,"ce":"SI","fe":"SI","co":"","po":"BALMASEDA","pr":"BIZKAIA"},{"c":"05484","n":"MIMETIZ","la":43.2158138,"lo":-3.1312555,"ce":"SI","fe":"NO","co":"","po":"ZALLA","pr":"BIZKAIA"},{"c":"05487","n":"TRASLAVIÑA","la":43.23329,"lo":-3.198304,"ce":"SI","fe":"SI","co":"","po":"ARTZENTALES","pr":"BIZKAIA"},{"c":"05489","n":"ARTZENTALES","la":43.2355083,"lo":-3.2133583,"ce":"SI","fe":"SI","co":"","po":"ERRIBERAGOITIA/RIBERA ALTA","pr":"BIZKAIA"},{"c":"05493","n":"VILLAVERDE DE TRUCIOS","la":43.24128,"lo":-3.25054,"ce":"SI","fe":"SI","co":"","po":"TRUCIOS-TURTZIOZ","pr":"BIZKAIA"},{"c":"05497","n":"KARRANTZA","la":43.238854,"lo":-3.357827,"ce":"SI","fe":"SI","co":"","po":"KARRANTZA HARANA/VALLE DE CARRANZA","pr":"BIZKAIA"},{"c":"05504","n":"PARQUE PRINCIPADO","la":43.3865865,"lo":-5.8087971,"ce":"SI","fe":"SI","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"05505","n":"COLLOTO","la":43.3795086,"lo":-5.792366,"ce":"SI","fe":"SI","co":"","po":"SIERO","pr":"ASTURIAS"},{"c":"05507","n":"MERES","la":43.3809885,"lo":-5.7487209,"ce":"SI","fe":"SI","co":"","po":"SIERO","pr":"ASTURIAS"},{"c":"05508","n":"FONCIELLO","la":43.3817779,"lo":-5.7297194,"ce":"SI","fe":"SI","co":"","po":"SIERO","pr":"ASTURIAS"},{"c":"05509","n":"EL BERRÓN","la":43.3827383,"lo":-5.7026774,"ce":"SI","fe":"SI","co":"","po":"SIERO","pr":"ASTURIAS"},{"c":"05511","n":"LA CARRERA DE SIERO","la":43.3869214,"lo":-5.6753462,"ce":"SI","fe":"SI","co":"","po":"SIERO","pr":"ASTURIAS"},{"c":"05513","n":"POLA DE SIERO","la":43.3881527,"lo":-5.6647718,"ce":"SI","fe":"SI","co":"","po":"SIERO","pr":"ASTURIAS"},{"c":"05515","n":"LOS CORROS","la":43.3768432,"lo":-5.6013769,"ce":"SI","fe":"SI","co":"","po":"SIERO","pr":"ASTURIAS"},{"c":"05517","n":"LIERES","la":43.380583,"lo":-5.5826229,"ce":"SI","fe":"SI","co":"","po":"SIERO","pr":"ASTURIAS"},{"c":"05521","n":"EL REMEDIO","la":43.3750793,"lo":-5.5462394,"ce":"SI","fe":"SI","co":"","po":"NAVA","pr":"ASTURIAS"},{"c":"05522","n":"LLAMES","la":43.3687796,"lo":-5.5252404,"ce":"SI","fe":"SI","co":"","po":"NAVA","pr":"ASTURIAS"},{"c":"05523","n":"NAVA","la":43.3611878,"lo":-5.5090986,"ce":"SI","fe":"SI","co":"","po":"NAVA","pr":"ASTURIAS"},{"c":"05525","n":"FUENTE SANTA DE NAVA","la":43.3555699,"lo":-5.478379,"ce":"SI","fe":"SI","co":"","po":"NAVA","pr":"ASTURIAS"},{"c":"05527","n":"CECEDA","la":43.3562226,"lo":-5.4511094,"ce":"SI","fe":"SI","co":"","po":"NAVA","pr":"ASTURIAS"},{"c":"05529","n":"CARANCOS","la":43.3555692,"lo":-5.4344422,"ce":"SI","fe":"SI","co":"","po":"NAVA","pr":"ASTURIAS"},{"c":"05531","n":"PINTUELES","la":43.3599234,"lo":-5.3841316,"ce":"SI","fe":"SI","co":"","po":"PILOÑA","pr":"ASTURIAS"},{"c":"05533","n":"INFIESTO","la":43.3517868,"lo":-5.3692019,"ce":"SI","fe":"SI","co":"","po":"PILOÑA","pr":"ASTURIAS"},{"c":"05534","n":"INFIESTO APEADERO","la":43.3440407,"lo":-5.3606414,"ce":"SI","fe":"SI","co":"","po":"PILOÑA","pr":"ASTURIAS"},{"c":"05535","n":"VILLAMAYOR","la":43.3631,"lo":-5.30285,"ce":"NO","fe":"SI","co":"","po":"PILOÑA","pr":"ASTURIAS"},{"c":"05537","n":"SEBARES","la":43.36236,"lo":-5.2574,"ce":"NO","fe":"SI","co":"","po":"PILOÑA","pr":"ASTURIAS"},{"c":"05539","n":"SOTO DE DUEÑAS","la":43.3583,"lo":-5.22689,"ce":"NO","fe":"SI","co":"","po":"PARRES","pr":"ASTURIAS"},{"c":"05541","n":"OZANES","la":43.368395,"lo":-5.185191,"ce":"NO","fe":"SI","co":"","po":"PARRES","pr":"ASTURIAS"},{"c":"05542","n":"POLICLÍNICO","la":43.378622,"lo":-5.18603,"ce":"NO","fe":"SI","co":"","po":"PARRES","pr":"ASTURIAS"},{"c":"05543","n":"ARRIONDAS","la":43.387513,"lo":-5.188258,"ce":"NO","fe":"SI","co":"","po":"PARRES","pr":"ASTURIAS"},{"c":"05545","n":"FUENTES","la":43.401443,"lo":-5.143117,"ce":"NO","fe":"SI","co":"","po":"PARRES","pr":"ASTURIAS"},{"c":"05547","n":"TORAÑO","la":43.412281,"lo":-5.118013,"ce":"NO","fe":"SI","co":"","po":"PARRES","pr":"ASTURIAS"},{"c":"05549","n":"CUEVAS","la":43.431144,"lo":-5.073302,"ce":"NO","fe":"SI","co":"","po":"RIBADESELLA","pr":"ASTURIAS"},{"c":"05551","n":"LLOVIO","la":43.440563,"lo":-5.055592,"ce":"NO","fe":"SI","co":"","po":"RIBADESELLA","pr":"ASTURIAS"},{"c":"05553","n":"RIBADESELLA","la":43.45945,"lo":-5.0545,"ce":"NO","fe":"SI","co":"","po":"RIBADESELLA","pr":"ASTURIAS"},{"c":"05555","n":"CAMANGO","la":43.44821,"lo":-5.01882,"ce":"NO","fe":"SI","co":"","po":"RIBADESELLA","pr":"ASTURIAS"},{"c":"05557","n":"BELMONTE DE PRÍA","la":43.4398,"lo":-4.98228,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05559","n":"NUEVA","la":43.440585,"lo":-4.935531,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05561","n":"VILLAHORMES","la":43.4420099,"lo":-4.90383,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05563","n":"POSADA","la":43.42483,"lo":-4.865,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05565","n":"BALMORI","la":43.42147,"lo":-4.83583,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05567","n":"CELORIO","la":43.42501,"lo":-4.81133,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05569","n":"POO","la":43.42429,"lo":-4.78189,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05571","n":"LLANES","la":43.42094,"lo":-4.7587,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05573","n":"SAN ROQUE DEL ACEBAL","la":43.39473,"lo":-4.73013,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05575","n":"VIDIAGO","la":43.39647,"lo":-4.673,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05577","n":"PENDUELES","la":43.39283,"lo":-4.63039,"ce":"NO","fe":"SI","co":"","po":"LLANES","pr":"ASTURIAS"},{"c":"05579","n":"COLOMBRES","la":43.38272,"lo":-4.55709,"ce":"NO","fe":"SI","co":"","po":"RIBADEDEVA","pr":"ASTURIAS"},{"c":"05602","n":"VALDECILLA LA MARGA","la":43.4529465,"lo":-3.8282409,"ce":"SI","fe":"SI","co":"","po":"SANTANDER","pr":"CANTABRIA"},{"c":"05621","n":"TORRELAVEGA-CENTRO","la":43.3510014,"lo":-4.0511789,"ce":"SI","fe":"SI","co":"","po":"TORRELAVEGA","pr":"CANTABRIA"},{"c":"05623","n":"PUENTE SAN MIGUEL","la":43.3586724,"lo":-4.0877667,"ce":"SI","fe":"SI","co":"","po":"REOCÍN","pr":"CANTABRIA"},{"c":"05637","n":"CABEZÓN DE LA SAL","la":43.3079038,"lo":-4.2319437,"ce":"SI","fe":"SI","co":"","po":"CABEZÓN DE LA SAL","pr":"CANTABRIA"},{"c":"05641","n":"TRECEÑO","la":43.31828,"lo":-4.30902,"ce":"SI","fe":"SI","co":"","po":"VALDÁLIGA","pr":"CANTABRIA"},{"c":"05643","n":"ROIZ","la":43.32821,"lo":-4.34927,"ce":"SI","fe":"SI","co":"","po":"VALDÁLIGA","pr":"CANTABRIA"},{"c":"05644","n":"EL BARCENAL","la":43.340347,"lo":-4.383335,"ce":"SI","fe":"SI","co":"","po":"SAN VICENTE DE LA BARQUERA","pr":"CANTABRIA"},{"c":"05645","n":"SAN VICENTE DE LA BARQUERA","la":43.367837,"lo":-4.404504,"ce":"SI","fe":"SI","co":"","po":"SAN VICENTE DE LA BARQUERA","pr":"CANTABRIA"},{"c":"05647","n":"PESUÉS","la":43.370289,"lo":-4.480174,"ce":"SI","fe":"SI","co":"","po":"VAL DE SAN VICENTE","pr":"CANTABRIA"},{"c":"05649","n":"UNQUERA","la":43.37478,"lo":-4.51434,"ce":"SI","fe":"SI","co":"","po":"VAL DE SAN VICENTE","pr":"CANTABRIA"},{"c":"05651","n":"NUEVA MONTAÑA","la":43.4401845,"lo":-3.8493711,"ce":"SI","fe":"SI","co":"","po":"SANTANDER","pr":"CANTABRIA"},{"c":"05652","n":"VALLE REAL","la":43.4275399,"lo":-3.8405377,"ce":"SI","fe":"SI","co":"","po":"SANTANDER","pr":"CANTABRIA"},{"c":"05655","n":"MALIAÑO VIDRIERA","la":43.4160163,"lo":-3.8411016,"ce":"SI","fe":"SI","co":"","po":"CAMARGO","pr":"CANTABRIA"},{"c":"05657","n":"ASTILLERO","la":43.4036508,"lo":-3.8206798,"ce":"SI","fe":"SI","co":"","po":"ASTILLERO (EL)","pr":"CANTABRIA"},{"c":"05661","n":"HERAS","la":43.4008996,"lo":-3.7666376,"ce":"SI","fe":"SI","co":"","po":"MEDIO CUDEYO","pr":"CANTABRIA"},{"c":"05663","n":"OREJO","la":43.3994776,"lo":-3.7383974,"ce":"SI","fe":"SI","co":"","po":"MARINA DE CUDEYO","pr":"CANTABRIA"},{"c":"05672","n":"PUENTE AGÜERO","la":43.406489,"lo":-3.719342,"ce":"SI","fe":"SI","co":"","po":"ENTRAMBASAGUAS","pr":"CANTABRIA"},{"c":"05673","n":"VILLAVERDE DE PONTONES","la":43.411322,"lo":-3.703643,"ce":"SI","fe":"SI","co":"","po":"RIBAMONTÁN AL MONTE","pr":"CANTABRIA"},{"c":"05675","n":"HOZ DE ANERO","la":43.404885,"lo":-3.666883,"ce":"SI","fe":"SI","co":"","po":"RIBAMONTÁN AL MONTE","pr":"CANTABRIA"},{"c":"05677","n":"BERANGA","la":43.41371,"lo":-3.57713,"ce":"SI","fe":"SI","co":"","po":"HAZAS DE CESTO","pr":"CANTABRIA"},{"c":"05679","n":"GAMA","la":43.42315,"lo":-3.52472,"ce":"SI","fe":"SI","co":"","po":"BÁRCENA DE CICERO","pr":"CANTABRIA"},{"c":"05681","n":"CICERO","la":43.417052,"lo":-3.49049,"ce":"SI","fe":"SI","co":"","po":"BÁRCENA DE CICERO","pr":"CANTABRIA"},{"c":"05683","n":"TRETO","la":43.39409,"lo":-3.4692,"ce":"SI","fe":"SI","co":"","po":"BÁRCENA DE CICERO","pr":"CANTABRIA"},{"c":"05685","n":"LIMPIAS","la":43.35881,"lo":-3.43334,"ce":"SI","fe":"SI","co":"","po":"LIMPIAS","pr":"CANTABRIA"},{"c":"05687","n":"MARRÓN","la":43.34661,"lo":-3.420918,"ce":"SI","fe":"SI","co":"","po":"AMPUERO","pr":"CANTABRIA"},{"c":"05689","n":"UDALLA","la":43.31368,"lo":-3.44549,"ce":"SI","fe":"SI","co":"","po":"RASINES","pr":"CANTABRIA"},{"c":"05691","n":"GIBAJA","la":43.28219,"lo":-3.43831,"ce":"SI","fe":"SI","co":"","po":"RAMALES DE LA VICTORIA","pr":"CANTABRIA"},{"c":"05721","n":"ARLA BERRÓN","la":43.166699,"lo":-3.227589,"ce":"NO","fe":"SI","co":"","po":"VALLE DE MENA","pr":"BURGOS"},{"c":"05722","n":"UNGO NAVA","la":43.142894,"lo":-3.264716,"ce":"NO","fe":"SI","co":"","po":"VALLE DE MENA","pr":"BURGOS"},{"c":"05724","n":"MERCADILLO VILLASANA","la":43.105209,"lo":-3.264469,"ce":"NO","fe":"SI","co":"","po":"CEREZO DE RÍO TIRÓN","pr":"BURGOS"},{"c":"05727","n":"CADAGUA","la":43.068171,"lo":-3.347339,"ce":"NO","fe":"SI","co":"","po":"VALLE DE MENA","pr":"BURGOS"},{"c":"05730","n":"BERCEDO-MONTIJA","la":43.088479,"lo":-3.456,"ce":"NO","fe":"SI","co":"","po":"MERINDAD DE SOTOSCUEVA","pr":"BURGOS"},{"c":"05731","n":"QUINTANA DE LOS PRADOS","la":43.08,"lo":-3.51,"ce":"NO","fe":"SI","co":"","po":"ESPINOSA DE LOS MONTEROS","pr":"BURGOS"},{"c":"05732","n":"ESPINOSA DE LOS MONTEROS","la":43.074252,"lo":-3.537116,"ce":"NO","fe":"SI","co":"","po":"ESPINOSA DE LOS MONTEROS","pr":"BURGOS"},{"c":"05733","n":"REDONDO","la":43.062993,"lo":-3.607895,"ce":"NO","fe":"SI","co":"","po":"MERINDAD DE SOTOSCUEVA","pr":"BURGOS"},{"c":"05734","n":"SOTOSCUEVA","la":43.045292,"lo":-3.688253,"ce":"NO","fe":"SI","co":"","po":"MERINDAD DE SOTOSCUEVA","pr":"BURGOS"},{"c":"05735","n":"PEDROSA","la":43.012367,"lo":-3.737852,"ce":"NO","fe":"SI","co":"","po":"MERINDAD DE VALDEPORRES","pr":"BURGOS"},{"c":"05736","n":"DOSANTE CIDAD","la":43.00125,"lo":-3.74525,"ce":"NO","fe":"SI","co":"","po":"MERINDAD DE VALDEPORRES","pr":"BURGOS"},{"c":"05737","n":"ROBREDO AHEDO","la":43.019094,"lo":-3.809231,"ce":"NO","fe":"SI","co":"","po":"MERINDAD DE VALDEPORRES","pr":"BURGOS"},{"c":"05738","n":"SONCILLO","la":43.005809,"lo":-3.844888,"ce":"NO","fe":"SI","co":"","po":"VALLE DE VALDEBEZANA","pr":"BURGOS"},{"c":"05739","n":"CABAÑAS DE VIRTUS","la":42.996397,"lo":-3.858466,"ce":"NO","fe":"SI","co":"","po":"VALLE DE VALDEBEZANA","pr":"BURGOS"},{"c":"05740","n":"ARIJA","la":42.991292,"lo":-3.945006,"ce":"NO","fe":"SI","co":"","po":"ARIJA","pr":"BURGOS"},{"c":"05741","n":"LLANO","la":42.988062,"lo":-3.982357,"ce":"NO","fe":"SI","co":"","po":"ROZAS DE VALDEARROYO (LAS)","pr":"CANTABRIA"},{"c":"05742","n":"LAS ROZAS DE VALDEARROYO","la":42.973605,"lo":-4.029864,"ce":"NO","fe":"SI","co":"","po":"ROZAS DE VALDEARROYO (LAS)","pr":"CANTABRIA"},{"c":"05743","n":"MONTES CLAROS","la":42.934323,"lo":-4.050073,"ce":"NO","fe":"SI","co":"","po":"VALDEPRADO DEL RÍO","pr":"CANTABRIA"},{"c":"05744","n":"LOS CARABEOS","la":42.910329,"lo":-4.075211,"ce":"NO","fe":"SI","co":"","po":"VALDEPRADO DEL RÍO","pr":"CANTABRIA"},{"c":"05747","n":"CILLAMAYOR","la":42.857752,"lo":-4.279178,"ce":"NO","fe":"SI","co":"","po":"BARRUELO DE SANTULLÁN","pr":"PALENCIA"},{"c":"05748","n":"SALINAS DE PISUERGA","la":42.851271,"lo":-4.386209,"ce":"NO","fe":"SI","co":"","po":"SALINAS DE PISUERGA","pr":"PALENCIA"},{"c":"05749","n":"VADO-CERVERA","la":42.83936,"lo":-4.49477,"ce":"NO","fe":"SI","co":"","po":"DEHESA DE MONTEJO","pr":"PALENCIA"},{"c":"05750","n":"CASTREJÓN DE LA PEÑA","la":42.81199,"lo":-4.60162,"ce":"NO","fe":"SI","co":"","po":"CASTREJÓN DE LA PEÑA","pr":"PALENCIA"},{"c":"05751","n":"VILLAVERDE TARILONTE","la":42.818353,"lo":-4.685419,"ce":"NO","fe":"SI","co":"","po":"SANTIBÁÑEZ DE LA PEÑA","pr":"PALENCIA"},{"c":"05752","n":"SANTIBÁÑEZ DE LA PEÑA","la":42.80204,"lo":-4.74145,"ce":"NO","fe":"SI","co":"","po":"SANTIBÁÑEZ DE LA PEÑA","pr":"PALENCIA"},{"c":"05753","n":"GUARDO APEADERO","la":42.7877378,"lo":-4.845133,"ce":"SI","fe":"SI","co":"","po":"GUARDO","pr":"PALENCIA"},{"c":"05754","n":"GUARDO","la":42.790995,"lo":-4.8519325,"ce":"SI","fe":"SI","co":"","po":"GUARDO","pr":"PALENCIA"},{"c":"05755","n":"LA LLAMA DE LA GUZPEÑA","la":42.7702481,"lo":-5.0412478,"ce":"SI","fe":"SI","co":"","po":"PRADO DE LA GUZPEÑA","pr":"LEÓN"},{"c":"05756","n":"LA ESPINA","la":42.786856,"lo":-4.9052025,"ce":"SI","fe":"SI","co":"","po":"VALDERRUEDA","pr":"LEÓN"},{"c":"05757","n":"VALCUENDE","la":42.765578,"lo":-4.9292558,"ce":"SI","fe":"SI","co":"","po":"VALDERRUEDA","pr":"LEÓN"},{"c":"05758","n":"PUENTE ALMUHEY","la":42.787632,"lo":-4.9718992,"ce":"SI","fe":"SI","co":"","po":"VALDERRUEDA","pr":"LEÓN"},{"c":"05759","n":"PRADO DE LA GUZPEÑA","la":42.7832347,"lo":-5.0270973,"ce":"SI","fe":"SI","co":"","po":"PRADO DE LA GUZPEÑA","pr":"LEÓN"},{"c":"05760","n":"VALLE DE LAS CASAS","la":42.767772,"lo":-5.0713669,"ce":"SI","fe":"SI","co":"","po":"CEBANICO","pr":"LEÓN"},{"c":"05761","n":"CISTIERNA","la":42.80316,"lo":-5.1307925,"ce":"SI","fe":"SI","co":"","po":"CISTIERNA","pr":"LEÓN"},{"c":"05763","n":"LA ERCINA","la":42.808848,"lo":-5.2138924,"ce":"SI","fe":"SI","co":"","po":"ERCINA (LA)","pr":"LEÓN"},{"c":"05766","n":"BOÑAR","la":42.8627875,"lo":-5.3285261,"ce":"SI","fe":"SI","co":"","po":"BOÑAR","pr":"LEÓN"},{"c":"05767","n":"LA VECILLA","la":42.8551158,"lo":-5.4121157,"ce":"SI","fe":"SI","co":"","po":"VECILLA (LA)","pr":"LEÓN"},{"c":"05770","n":"MATALLANA","la":42.841149,"lo":-5.5218718,"ce":"SI","fe":"SI","co":"","po":"MATALLANA DE TORÍO","pr":"LEÓN"},{"c":"05776","n":"SAN FELIZ","la":42.6823112,"lo":-5.5379086,"ce":"SI","fe":"SI","co":"","po":"GARRAFE DE TORÍO","pr":"LEÓN"},{"c":"05778","n":"FEVE-LEÓN","la":42.6024918,"lo":-5.5749341,"ce":"SI","fe":"SI","co":"","po":"LEÓN","pr":"LEÓN"},{"c":"05790","n":"SORRIBA","la":42.786277,"lo":-5.1274758,"ce":"SI","fe":"SI","co":"","po":"VALVERDE DE LA VIRGEN","pr":"LEÓN"},{"c":"05799","n":"CEREZAL DE LA GUZPEÑA","la":42.7797744,"lo":-5.0055719,"ce":"SI","fe":"SI","co":"","po":"PRADO DE LA GUZPEÑA","pr":"LEÓN"},{"c":"05803","n":"LA ASUNCIÓN UNIVERSIDAD","la":42.6160983,"lo":-5.5660988,"ce":"SI","fe":"SI","co":"","po":"LEÓN","pr":"LEÓN"},{"c":"06002","n":"ALHAMA DE MURCIA","la":37.8494024,"lo":-1.4145141,"ce":"SI","fe":"NO","co":"","po":"ALHAMA DE MURCIA","pr":"MURCIA"},{"c":"06003","n":"TOTANA","la":37.7635424,"lo":-1.4956153,"ce":"SI","fe":"NO","co":"","po":"TOTANA","pr":"MURCIA"},{"c":"06006","n":"LORCA-SUTULLENA","la":37.6721129,"lo":-1.6962305,"ce":"SI","fe":"NO","co":"","po":"LORCA","pr":"MURCIA"},{"c":"07004","n":"ÁGUILAS","la":37.409865,"lo":-1.5725342,"ce":"SI","fe":"NO","co":"","po":"ÁGUILAS","pr":"MURCIA"},{"c":"08004","n":"SEGOVIA-GUIOMAR","la":40.910577,"lo":-4.094564,"ce":"NO","fe":"NO","co":"SEGOV","po":"SEGOVIA","pr":"SEGOVIA"},{"c":"08223","n":"VIGO URZAIZ","la":42.234189,"lo":-8.713728,"ce":"NO","fe":"NO","co":"VIGO-","po":"VIGO","pr":"PONTEVEDRA"},{"c":"08224","n":"REDONDELA AV","la":42.284509,"lo":-8.603573,"ce":"NO","fe":"NO","co":"REDON","po":"REDONDELA","pr":"PONTEVEDRA"},{"c":"08240","n":"MEDINA DEL CAMPO AV","la":41.317459,"lo":-4.910071,"ce":"NO","fe":"NO","co":"MEDIN","po":"MEDINA DEL CAMPO","pr":"VALLADOLID"},{"c":"08247","n":"SANABRIA AV","la":42.0450532,"lo":-6.5631319,"ce":"NO","fe":"NO","co":"PUEBL","po":"PUEBLA DE SANABRIA","pr":"ZAMORA"},{"c":"08251","n":"A GUDIÑA-PORTA DE GALICIA","la":42.0635401,"lo":-7.1355604,"ce":"NO","fe":"NO","co":"","po":"GUDIÑA (A)","pr":"OURENSE"},{"c":"10000","n":"MADRID-PRÍNCIPE PÍO","la":40.4214895,"lo":-3.7189689,"ce":"SI","fe":"NO","co":"MADRI","po":"MADRID","pr":"MADRID"},{"c":"10001","n":"ARAVACA","la":40.4484551,"lo":-3.7855547,"ce":"SI","fe":"NO","co":"","po":"MADRID","pr":"MADRID"},{"c":"10002","n":"POZUELO","la":40.4474569,"lo":-3.8002779,"ce":"SI","fe":"NO","co":"","po":"POZUELO DE ALARCÓN","pr":"MADRID"},{"c":"10005","n":"LAS ROZAS","la":40.4942887,"lo":-3.8681747,"ce":"SI","fe":"NO","co":"","po":"ROZAS DE MADRID (LAS)","pr":"MADRID"},{"c":"10100","n":"PINAR DE LAS ROZAS","la":40.5222672,"lo":-3.8822477,"ce":"SI","fe":"NO","co":"","po":"ROZAS DE MADRID (LAS)","pr":"MADRID"},{"c":"10101","n":"LAS MATAS","la":40.5523869,"lo":-3.8967664,"ce":"SI","fe":"NO","co":"","po":"ROZAS DE MADRID (LAS)","pr":"MADRID"},{"c":"10103","n":"TORRELODONES","la":40.574554,"lo":-3.9566013,"ce":"SI","fe":"NO","co":"","po":"TORRELODONES","pr":"MADRID"},{"c":"10104","n":"GALAPAGAR-LA NAVATA","la":40.6003138,"lo":-3.982259,"ce":"SI","fe":"NO","co":"","po":"GALAPAGAR","pr":"MADRID"},{"c":"10200","n":"VILLALBA DE GUADARRAMA","la":40.6264893,"lo":-4.0080301,"ce":"SI","fe":"NO","co":"","po":"COLLADO VILLALBA","pr":"MADRID"},{"c":"10201","n":"SAN YAGO","la":40.6178953,"lo":-4.0310749,"ce":"SI","fe":"NO","co":"","po":"GALAPAGAR","pr":"MADRID"},{"c":"10202","n":"LAS ZORRERAS-NAVALQUEJIGO","la":40.6093116,"lo":-4.0463626,"ce":"SI","fe":"NO","co":"","po":"SAN LORENZO DE EL ESCORIAL","pr":"MADRID"},{"c":"10203","n":"EL ESCORIAL","la":40.5853675,"lo":-4.1324053,"ce":"SI","fe":"NO","co":"","po":"SAN LORENZO DE EL ESCORIAL","pr":"MADRID"},{"c":"10204","n":"ZARZALEJO","la":40.5389272,"lo":-4.1580662,"ce":"SI","fe":"NO","co":"","po":"ZARZALEJO","pr":"MADRID"},{"c":"10205","n":"ROBLEDO DE CHAVELA","la":40.5208244,"lo":-4.2467592,"ce":"SI","fe":"NO","co":"","po":"ROBLEDO DE CHAVELA","pr":"MADRID"},{"c":"10206","n":"SANTA MARÍA DE LA ALAMEDA-PEGUERINOS","la":40.569001,"lo":-4.2691255,"ce":"SI","fe":"NO","co":"","po":"SANTA MARÍA DE LA ALAMEDA","pr":"MADRID"},{"c":"10207","n":"LAS NAVAS DEL MARQUÉS","la":40.589205,"lo":-4.362259,"ce":"NO","fe":"NO","co":"","po":"NAVAS DEL MARQUÉS (LAS)","pr":"ÁVILA"},{"c":"10208","n":"NAVALPERAL","la":40.591152,"lo":-4.408382,"ce":"NO","fe":"NO","co":"","po":"NAVALPERAL DE PINARES","pr":"ÁVILA"},{"c":"10209","n":"EL PIMPOLLAR","la":40.567587,"lo":-4.283541,"ce":"NO","fe":"NO","co":"","po":"SANTA MARÍA DE LA ALAMEDA","pr":"MADRID"},{"c":"10300","n":"HERRADÓN-LA CAÑADA","la":40.599275,"lo":-4.495039,"ce":"NO","fe":"NO","co":"","po":"HERRADÓN DE PINARES","pr":"ÁVILA"},{"c":"10302","n":"GUIMORCONDO","la":40.649062,"lo":-4.614987,"ce":"NO","fe":"NO","co":"","po":"ÁVILA","pr":"ÁVILA"},{"c":"10400","n":"ÁVILA","la":40.657255,"lo":-4.683312,"ce":"NO","fe":"NO","co":"","po":"ÁVILA","pr":"ÁVILA"},{"c":"10409","n":"ARÉVALO","la":41.047123,"lo":-4.701988,"ce":"NO","fe":"NO","co":"","po":"ARÉVALO","pr":"ÁVILA"},{"c":"10500","n":"MEDINA DEL CAMPO","la":41.317617,"lo":-4.909923,"ce":"NO","fe":"NO","co":"MEDIN","po":"MEDINA DEL CAMPO","pr":"VALLADOLID"},{"c":"10501","n":"POZALDEZ","la":41.36792,"lo":-4.836001,"ce":"NO","fe":"NO","co":"","po":"POZALDEZ","pr":"VALLADOLID"},{"c":"10502","n":"MATAPOZUELOS","la":41.422794,"lo":-4.801025,"ce":"NO","fe":"NO","co":"","po":"MATAPOZUELOS","pr":"VALLADOLID"},{"c":"10503","n":"VALDESTILLAS","la":41.488729,"lo":-4.772937,"ce":"NO","fe":"NO","co":"","po":"VALDESTILLAS","pr":"VALLADOLID"},{"c":"10504","n":"VIANA","la":41.52407,"lo":-4.754489,"ce":"NO","fe":"NO","co":"","po":"VIANA DE CEGA","pr":"VALLADOLID"},{"c":"10600","n":"VALLADOLID-CAMPO GRANDE","la":41.642167,"lo":-4.726986,"ce":"NO","fe":"NO","co":"","po":"VALLADOLID","pr":"VALLADOLID"},{"c":"10602","n":"CABEZÓN DEL PISUERGA","la":41.737276,"lo":-4.651294,"ce":"NO","fe":"NO","co":"","po":"CABEZÓN DE PISUERGA","pr":"VALLADOLID"},{"c":"10603","n":"CORCOS-AGUILAREJO","la":41.766446,"lo":-4.623485,"ce":"NO","fe":"NO","co":"","po":"CORCOS","pr":"VALLADOLID"},{"c":"10604","n":"CUBILLAS DE SANTA MARTA","la":41.808861,"lo":-4.579754,"ce":"NO","fe":"NO","co":"","po":"CUBILLAS DE SANTA MARTA","pr":"VALLADOLID"},{"c":"10605","n":"DUEÑAS","la":41.87048,"lo":-4.541216,"ce":"NO","fe":"NO","co":"","po":"DUEÑAS","pr":"PALENCIA"},{"c":"10610","n":"VALLADOLID UNIVERSIDAD","la":41.660257,"lo":-4.704037,"ce":"NO","fe":"NO","co":"","po":"VALLADOLID","pr":"VALLADOLID"},{"c":"11000","n":"VENTA DE BAÑOS","la":41.91736,"lo":-4.495844,"ce":"NO","fe":"NO","co":"","po":"VENTA DE BAÑOS","pr":"PALENCIA"},{"c":"11004","n":"MAGAZ","la":41.976561,"lo":-4.432114,"ce":"NO","fe":"NO","co":"","po":"MAGAZ DE PISUERGA","pr":"PALENCIA"},{"c":"11006","n":"QUINTANA DEL PUENTE","la":42.079974,"lo":-4.19858,"ce":"NO","fe":"NO","co":"","po":"QUINTANA DEL PUENTE","pr":"PALENCIA"},{"c":"11009","n":"VILLAQUIRÁN","la":42.215717,"lo":-3.999396,"ce":"NO","fe":"NO","co":"","po":"VILLAQUIRÁN DE LOS INFANTES","pr":"BURGOS"},{"c":"11014","n":"BURGOS-ROSA MANZANO","la":42.371197,"lo":-3.666308,"ce":"NO","fe":"NO","co":"","po":"BURGOS","pr":"BURGOS"},{"c":"11109","n":"BRIVIESCA","la":42.542765,"lo":-3.319287,"ce":"NO","fe":"NO","co":"","po":"BRIVIESCA","pr":"BURGOS"},{"c":"11111","n":"PANCORBO","la":42.630486,"lo":-3.112307,"ce":"NO","fe":"NO","co":"","po":"PANCORBO","pr":"BURGOS"},{"c":"11200","n":"MIRANDA DE EBRO","la":42.691024,"lo":-2.940366,"ce":"SI","fe":"NO","co":"","po":"MIRANDA DE EBRO","pr":"BURGOS"},{"c":"11203","n":"MANZANOS","la":42.742899,"lo":-2.867501,"ce":"SI","fe":"NO","co":"","po":"RIBERA BAJA/ERRIBERA BEITIA","pr":"ARABA/ÁLAVA"},{"c":"11204","n":"LA PUEBLA DE ARGANZÓN","la":42.765245,"lo":-2.830385,"ce":"SI","fe":"NO","co":"","po":"PUEBLA DE ARGANZÓN (LA)","pr":"BURGOS"},{"c":"11205","n":"NANCLARES-LANGRAIZ","la":42.816216,"lo":-2.804942,"ce":"SI","fe":"NO","co":"","po":"IRUÑA OKA/IRUÑA DE OCA","pr":"ARABA/ÁLAVA"},{"c":"11208","n":"VITORIA-GASTEIZ","la":42.841517,"lo":-2.672601,"ce":"SI","fe":"NO","co":"","po":"VITORIA-GASTEIZ","pr":"ARABA/ÁLAVA"},{"c":"11210","n":"ALEGRÍA-DULANTZI","la":42.848723,"lo":-2.514668,"ce":"SI","fe":"NO","co":"","po":"ALEGRÍA-DULANTZI","pr":"ARABA/ÁLAVA"},{"c":"11212","n":"AGURAIN-SALVATIERRA DE ÁLAVA","la":42.84643,"lo":-2.38921,"ce":"SI","fe":"NO","co":"","po":"SALVATIERRA/AGURAIN","pr":"ARABA/ÁLAVA"},{"c":"11213","n":"ARAIA","la":42.869599,"lo":-2.306807,"ce":"SI","fe":"NO","co":"","po":"ZALDUONDO","pr":"ARABA/ÁLAVA"},{"c":"11300","n":"ALTSASU","la":42.894847,"lo":-2.181237,"ce":"SI","fe":"NO","co":"","po":"ALTSASU/ALSASUA","pr":"NAVARRA"},{"c":"11305","n":"BRINKOLA","la":43.0189865,"lo":-2.3346811,"ce":"SI","fe":"NO","co":"","po":"LEGAZPI","pr":"GIPUZKOA"},{"c":"11306","n":"LEGAZPI","la":43.0510385,"lo":-2.3306103,"ce":"SI","fe":"NO","co":"","po":"LEGAZPI","pr":"GIPUZKOA"},{"c":"11400","n":"ZUMARRAGA","la":43.0870824,"lo":-2.3202298,"ce":"SI","fe":"NO","co":"","po":"ZUMARRAGA","pr":"GIPUZKOA"},{"c":"11402","n":"ORMÁIZTEGUI","la":43.0402752,"lo":-2.256462,"ce":"SI","fe":"NO","co":"","po":"ORMAIZTEGI","pr":"GIPUZKOA"},{"c":"11404","n":"BEASAIN","la":43.0462687,"lo":-2.2022994,"ce":"SI","fe":"NO","co":"","po":"BEASAIN","pr":"GIPUZKOA"},{"c":"11405","n":"ORDIZIA","la":43.0527547,"lo":-2.1791923,"ce":"SI","fe":"NO","co":"","po":"ORDIZIA","pr":"GIPUZKOA"},{"c":"11500","n":"TOLOSA","la":43.1354472,"lo":-2.0790886,"ce":"SI","fe":"NO","co":"","po":"TOLOSA","pr":"GIPUZKOA"},{"c":"11501","n":"TOLOSA-CENTRO","la":43.1393963,"lo":-2.0741122,"ce":"SI","fe":"NO","co":"","po":"TOLOSA","pr":"GIPUZKOA"},{"c":"11503","n":"BILLABONA-ZIZURKIL","la":43.1891906,"lo":-2.0553722,"ce":"SI","fe":"NO","co":"","po":"VILLABONA","pr":"GIPUZKOA"},{"c":"11504","n":"ANDOAIN-CENTRO","la":43.2155738,"lo":-2.0204595,"ce":"SI","fe":"NO","co":"","po":"ANDOAIN","pr":"GIPUZKOA"},{"c":"11507","n":"HERNANI-ERDIA","la":43.2664779,"lo":-1.9726232,"ce":"SI","fe":"NO","co":"","po":"HERNANI","pr":"GIPUZKOA"},{"c":"11511","n":"SAN SEBASTIÁN-DONOSTIA","la":43.3176961,"lo":-1.9767172,"ce":"SI","fe":"NO","co":"","po":"DONOSTIA/SAN SEBASTIÁN","pr":"GIPUZKOA"},{"c":"11512","n":"GROS","la":43.3218457,"lo":-1.9738835,"ce":"SI","fe":"NO","co":"","po":"DONOSTIA/SAN SEBASTIÁN","pr":"GIPUZKOA"},{"c":"11513","n":"ATEGORRIETA","la":43.3203225,"lo":-1.9598127,"ce":"SI","fe":"NO","co":"","po":"DONOSTIA/SAN SEBASTIÁN","pr":"GIPUZKOA"},{"c":"11514","n":"HERRERA","la":43.3193537,"lo":-1.9370173,"ce":"SI","fe":"NO","co":"","po":"DONOSTIA/SAN SEBASTIÁN","pr":"GIPUZKOA"},{"c":"11515","n":"PASAIA","la":43.3189428,"lo":-1.9171727,"ce":"SI","fe":"NO","co":"","po":"PASAIA","pr":"GIPUZKOA"},{"c":"11516","n":"LEZO-RENTERÍA","la":43.3159364,"lo":-1.8994386,"ce":"SI","fe":"NO","co":"","po":"LEZO","pr":"GIPUZKOA"},{"c":"11522","n":"INTXAURRONDO","la":43.3200487,"lo":-1.9517673,"ce":"SI","fe":"NO","co":"","po":"DONOSTIA/SAN SEBASTIÁN","pr":"GIPUZKOA"},{"c":"11600","n":"IRUN","la":43.3395365,"lo":-1.8012519,"ce":"SI","fe":"NO","co":"IRUN-","po":"IRUN","pr":"GIPUZKOA"},{"c":"12001","n":"LOS NEGRALES","la":40.638567,"lo":-4.0218746,"ce":"SI","fe":"NO","co":"","po":"ALPEDRETE","pr":"MADRID"},{"c":"12002","n":"ALPEDRETE","la":40.6581044,"lo":-4.0349719,"ce":"SI","fe":"NO","co":"","po":"ALPEDRETE","pr":"MADRID"},{"c":"12004","n":"COLLADO MEDIANO","la":40.6928982,"lo":-4.0359271,"ce":"SI","fe":"NO","co":"","po":"COLLADO MEDIANO","pr":"MADRID"},{"c":"12005","n":"LOS MOLINOS-GUADARRAMA","la":40.7066407,"lo":-4.0671991,"ce":"SI","fe":"NO","co":"","po":"MOLINOS (LOS)","pr":"MADRID"},{"c":"12006","n":"CERCEDILLA","la":40.7376129,"lo":-4.0662985,"ce":"SI","fe":"NO","co":"","po":"CERCEDILLA","pr":"MADRID"},{"c":"12009","n":"SAN RAFAEL","la":40.714944,"lo":-4.18143,"ce":"NO","fe":"NO","co":"","po":"CASTRO DEL RÍO","pr":"SEGOVIA"},{"c":"12010","n":"EL ESPINAR","la":40.740852,"lo":-4.189482,"ce":"NO","fe":"NO","co":"","po":"CASTRO DEL RÍO","pr":"SEGOVIA"},{"c":"12011","n":"LOS ÁNGELES DE SAN RAFAEL","la":40.777909,"lo":-4.206933,"ce":"NO","fe":"NO","co":"","po":"CASTRO DEL RÍO","pr":"SEGOVIA"},{"c":"12012","n":"OTERO-HERREROS","la":40.80097,"lo":-4.203504,"ce":"NO","fe":"NO","co":"","po":"OTERO DE HERREROS","pr":"SEGOVIA"},{"c":"12013","n":"ORTIGOSA DEL MONTE","la":40.832771,"lo":-4.168094,"ce":"NO","fe":"NO","co":"","po":"ORTIGOSA DEL MONTE","pr":"SEGOVIA"},{"c":"12014","n":"NAVAS DE RIOFRÍO-LA LOSA","la":40.856673,"lo":-4.141103,"ce":"NO","fe":"NO","co":"","po":"NAVAS DE RIOFRÍO","pr":"SEGOVIA"},{"c":"12020","n":"PUERTO DE NAVACERRADA","la":40.7844678,"lo":-4.0047744,"ce":"SI","fe":"NO","co":"","po":"CERCEDILLA","pr":"MADRID"},{"c":"12023","n":"LOS COTOS","la":40.8223419,"lo":-3.9644961,"ce":"SI","fe":"NO","co":"","po":"REAL SITIO DE SAN ILDEFONSO","pr":"SEGOVIA"},{"c":"12100","n":"SEGOVIA","la":40.93403,"lo":-4.11365,"ce":"NO","fe":"NO","co":"SEGOV","po":"SEGOVIA","pr":"SEGOVIA"},{"c":"13106","n":"LLODIO","la":43.1423514,"lo":-2.9606511,"ce":"SI","fe":"NO","co":"","po":"LAUDIO/LLODIO","pr":"ARABA/ÁLAVA"},{"c":"13200","n":"BILBAO-INTERMOD. ABANDO INDALECIO PRIETO","la":43.2601304,"lo":-2.9285592,"ce":"SI","fe":"NO","co":"","po":"BILBAO","pr":"BIZKAIA"},{"c":"13206","n":"AMETZOLA","la":43.2547065,"lo":-2.9436598,"ce":"SI","fe":"NO","co":"","po":"BILBAO","pr":"BIZKAIA"},{"c":"14100","n":"PALENCIA","la":42.015711,"lo":-4.534135,"ce":"NO","fe":"NO","co":"","po":"PALENCIA","pr":"PALENCIA"},{"c":"14101","n":"MONZÓN DE CAMPOS","la":42.105538,"lo":-4.501677,"ce":"NO","fe":"NO","co":"","po":"MONZÓN DE CAMPOS","pr":"PALENCIA"},{"c":"14102","n":"AMUSCO","la":42.178019,"lo":-4.480743,"ce":"NO","fe":"NO","co":"","po":"AMUSCO","pr":"PALENCIA"},{"c":"14103","n":"PIÑA","la":42.211747,"lo":-4.434689,"ce":"NO","fe":"NO","co":"","po":"PIÑA DE CAMPOS","pr":"PALENCIA"},{"c":"14104","n":"FRÓMISTA","la":42.2649,"lo":-4.402433,"ce":"NO","fe":"NO","co":"","po":"FRÓMISTA","pr":"PALENCIA"},{"c":"14107","n":"OSORNO","la":42.415077,"lo":-4.357367,"ce":"NO","fe":"NO","co":"","po":"OSORNO LA MAYOR","pr":"PALENCIA"},{"c":"14108","n":"ESPINOSA DE VILLAGONZALO","la":42.452373,"lo":-4.367811,"ce":"NO","fe":"NO","co":"","po":"ESPINOSA DE VILLAGONZALO","pr":"PALENCIA"},{"c":"14111","n":"HERRERA DE PISUERGA","la":42.598477,"lo":-4.316683,"ce":"NO","fe":"NO","co":"","po":"HERRERA DE PISUERGA","pr":"PALENCIA"},{"c":"14112","n":"ALAR DEL REY","la":42.656837,"lo":-4.311372,"ce":"NO","fe":"NO","co":"","po":"ALAR DEL REY","pr":"PALENCIA"},{"c":"14113","n":"MAVE","la":42.723726,"lo":-4.27616,"ce":"NO","fe":"NO","co":"","po":"AGUILAR DE CAMPOO","pr":"PALENCIA"},{"c":"14114","n":"AGUILAR DE CAMPOO","la":42.785362,"lo":-4.233899,"ce":"NO","fe":"NO","co":"","po":"AGUILAR DE CAMPOO","pr":"PALENCIA"},{"c":"14115","n":"QUINTANILLA DE LAS TORRES","la":42.81903,"lo":-4.202753,"ce":"NO","fe":"NO","co":"","po":"POMAR DE VALDIVIA","pr":"PALENCIA"},{"c":"14117","n":"EL CARRIÓN","la":42.1166417,"lo":-4.500692,"ce":"NO","fe":"NO","co":"","po":"MONZÓN DE CAMPOS","pr":"PALENCIA"},{"c":"14200","n":"MATAPORQUERA","la":42.870901,"lo":-4.165406,"ce":"NO","fe":"NO","co":"","po":"VALDEOLEA","pr":"CANTABRIA"},{"c":"14202","n":"REINOSA","la":42.9944991,"lo":-4.1409454,"ce":"SI","fe":"NO","co":"","po":"REINOSA","pr":"CANTABRIA"},{"c":"14206","n":"BÁRCENA","la":43.1287054,"lo":-4.053473,"ce":"SI","fe":"NO","co":"","po":"BÁRCENA DE PIE DE CONCHA","pr":"CANTABRIA"},{"c":"14210","n":"LOS CORRALES DE BUELNA","la":43.2551009,"lo":-4.0639472,"ce":"SI","fe":"NO","co":"","po":"CORRALES DE BUELNA (LOS)","pr":"CANTABRIA"},{"c":"14211","n":"LAS CALDAS DE BESAYA","la":43.2985945,"lo":-4.073252,"ce":"SI","fe":"NO","co":"","po":"CORRALES DE BUELNA (LOS)","pr":"CANTABRIA"},{"c":"14213","n":"TORRELAVEGA","la":43.3276776,"lo":-4.0426871,"ce":"SI","fe":"NO","co":"","po":"TORRELAVEGA","pr":"CANTABRIA"},{"c":"14216","n":"RENEDO","la":43.3531069,"lo":-3.9496471,"ce":"SI","fe":"NO","co":"","po":"PIÉLAGOS","pr":"CANTABRIA"},{"c":"14220","n":"MALIAÑO","la":43.4161415,"lo":-3.8410762,"ce":"SI","fe":"NO","co":"","po":"CAMARGO","pr":"CANTABRIA"},{"c":"14223","n":"SANTANDER","la":43.4583981,"lo":-3.8109529,"ce":"SI","fe":"NO","co":"","po":"SANTANDER","pr":"CANTABRIA"},{"c":"14230","n":"VALDECILLA","la":43.4540888,"lo":-3.8277628,"ce":"SI","fe":"NO","co":"","po":"SANTANDER","pr":"CANTABRIA"},{"c":"15001","n":"GRIJOTA","la":42.049225,"lo":-4.583954,"ce":"NO","fe":"NO","co":"","po":"GRIJOTA","pr":"PALENCIA"},{"c":"15003","n":"BECERRIL","la":42.104706,"lo":-4.64712,"ce":"NO","fe":"NO","co":"","po":"BECERRIL DE CAMPOS","pr":"PALENCIA"},{"c":"15004","n":"PAREDES DE NAVA","la":42.150694,"lo":-4.697599,"ce":"NO","fe":"NO","co":"","po":"PAREDES DE NAVA","pr":"PALENCIA"},{"c":"15006","n":"CISNEROS","la":42.19112,"lo":-4.850249,"ce":"NO","fe":"NO","co":"","po":"CISNEROS","pr":"PALENCIA"},{"c":"15007","n":"VILLADA","la":42.245238,"lo":-4.970589,"ce":"NO","fe":"NO","co":"","po":"VILLADA","pr":"PALENCIA"},{"c":"15008","n":"GRAJAL","la":42.323246,"lo":-5.013381,"ce":"NO","fe":"NO","co":"","po":"GRAJAL DE CAMPOS","pr":"LEÓN"},{"c":"15009","n":"SAHAGÚN","la":42.369329,"lo":-5.022667,"ce":"NO","fe":"NO","co":"","po":"SAHAGÚN","pr":"LEÓN"},{"c":"15012","n":"EL BURGO RANERO","la":42.425753,"lo":-5.208592,"ce":"NO","fe":"NO","co":"","po":"BURGO RANERO (EL)","pr":"LEÓN"},{"c":"15014","n":"SANTAS MARTAS","la":42.460004,"lo":-5.386777,"ce":"NO","fe":"NO","co":"","po":"SANTAS MARTAS","pr":"LEÓN"},{"c":"15015","n":"PALANQUINOS","la":42.460716,"lo":-5.497584,"ce":"NO","fe":"NO","co":"","po":"VILLANUEVA DE LAS MANZANAS","pr":"LEÓN"},{"c":"15100","n":"LEÓN","la":42.596048,"lo":-5.582428,"ce":"NO","fe":"NO","co":"","po":"LEÓN","pr":"LEÓN"},{"c":"15106","n":"LA ROBLA","la":42.804454,"lo":-5.626255,"ce":"NO","fe":"NO","co":"","po":"ROBLA (LA)","pr":"LEÓN"},{"c":"15108","n":"LA POLA DE GORDÓN","la":42.854099,"lo":-5.674524,"ce":"NO","fe":"NO","co":"","po":"POLA DE GORDÓN (LA)","pr":"LEÓN"},{"c":"15109","n":"SANTA LUCÍA","la":42.87515,"lo":-5.639613,"ce":"NO","fe":"NO","co":"","po":"POLA DE GORDÓN (LA)","pr":"LEÓN"},{"c":"15112","n":"VILLAMANÍN","la":42.93671,"lo":-5.657637,"ce":"NO","fe":"NO","co":"","po":"VILLAMANÍN","pr":"LEÓN"},{"c":"15113","n":"BUSDONGO","la":42.984495,"lo":-5.705391,"ce":"NO","fe":"NO","co":"","po":"VILLAMANÍN","pr":"LEÓN"},{"c":"15116","n":"LINARES-CONGOSTINAS","la":43.101743,"lo":-5.772162,"ce":"NO","fe":"NO","co":"","po":"LENA","pr":"ASTURIAS"},{"c":"15118","n":"PUENTE DE LOS FIERROS","la":43.0715986,"lo":-5.769465,"ce":"SI","fe":"NO","co":"","po":"LENA","pr":"ASTURIAS"},{"c":"15120","n":"CAMPOMANES","la":43.1100681,"lo":-5.8164466,"ce":"SI","fe":"NO","co":"","po":"LENA","pr":"ASTURIAS"},{"c":"15122","n":"POLA DE LENA","la":43.15872,"lo":-5.8310263,"ce":"SI","fe":"NO","co":"","po":"LENA","pr":"ASTURIAS"},{"c":"15200","n":"UJO","la":43.2046962,"lo":-5.7926422,"ce":"SI","fe":"NO","co":"","po":"MIERES","pr":"ASTURIAS"},{"c":"15203","n":"MIERES-PUENTE","la":43.2500266,"lo":-5.7822622,"ce":"SI","fe":"NO","co":"","po":"MIERES","pr":"ASTURIAS"},{"c":"15211","n":"OVIEDO","la":43.3663577,"lo":-5.854838,"ce":"SI","fe":"NO","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"15217","n":"LA CORREDORIA","la":43.388108,"lo":-5.8272527,"ce":"SI","fe":"NO","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"15218","n":"LLAMAQUIQUE","la":43.3588282,"lo":-5.8573201,"ce":"SI","fe":"NO","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"15401","n":"CALZADA DE ASTURIAS","la":43.5353848,"lo":-5.6971507,"ce":"SI","fe":"NO","co":"","po":"GIJÓN","pr":"ASTURIAS"},{"c":"15410","n":"GIJÓN-SANZ CRESPO","la":43.5377329,"lo":-5.6758089,"ce":"SI","fe":"NO","co":"GIJON","po":"GIJÓN","pr":"ASTURIAS"},{"c":"16403","n":"AVILÉS","la":43.561339,"lo":-5.9228329,"ce":"SI","fe":"NO","co":"","po":"AVILÉS","pr":"ASTURIAS"},{"c":"17000","n":"MADRID-CHAMARTÍN-CLARA CAMPOAMOR","la":40.4711789,"lo":-3.6829524,"ce":"SI","fe":"NO","co":"MADRI","po":"MADRID","pr":"MADRID"},{"c":"18000","n":"MADRID-ATOCHA CERCANÍAS","la":40.4066191,"lo":-3.6894391,"ce":"SI","fe":"NO","co":"MADRI","po":"MADRID","pr":"MADRID"},{"c":"18001","n":"MADRID-RECOLETOS","la":40.4233731,"lo":-3.690931,"ce":"SI","fe":"NO","co":"","po":"MADRID","pr":"MADRID"},{"c":"18002","n":"MADRID-NUEVOS MINISTERIOS","la":40.4466271,"lo":-3.6923468,"ce":"SI","fe":"NO","co":"MADRI","po":"MADRID","pr":"MADRID"},{"c":"20002","n":"QUINTANA-RANEROS","la":42.550085,"lo":-5.637789,"ce":"NO","fe":"NO","co":"","po":"SANTOVENIA DE LA VALDONCINA","pr":"LEÓN"},{"c":"20005","n":"VEGUELLINA","la":42.4335,"lo":-5.88756,"ce":"NO","fe":"NO","co":"","po":"VILLAREJO DE ÓRBIGO","pr":"LEÓN"},{"c":"20006","n":"BARRIENTOS","la":42.414301,"lo":-5.963988,"ce":"NO","fe":"NO","co":"","po":"VALDERREY","pr":"LEÓN"},{"c":"20007","n":"NISTAL","la":42.424462,"lo":-6.00803,"ce":"NO","fe":"NO","co":"","po":"SAN JUSTO DE LA VEGA","pr":"LEÓN"},{"c":"20008","n":"VILLAVANTE","la":42.46458,"lo":-5.838914,"ce":"NO","fe":"NO","co":"","po":"SANTA MARINA DEL REY","pr":"LEÓN"},{"c":"20100","n":"ASTORGA","la":42.459489,"lo":-6.047212,"ce":"NO","fe":"NO","co":"","po":"ASTORGA","pr":"LEÓN"},{"c":"20102","n":"VEGA-MAGAZ","la":42.55376,"lo":-6.068267,"ce":"NO","fe":"NO","co":"","po":"MAGAZ DE CEPEDA","pr":"LEÓN"},{"c":"20103","n":"PORQUEROS","la":42.598935,"lo":-6.108238,"ce":"NO","fe":"NO","co":"","po":"MAGAZ DE CEPEDA","pr":"LEÓN"},{"c":"20104","n":"BRAÑUELAS","la":42.632631,"lo":-6.201002,"ce":"NO","fe":"NO","co":"","po":"VILLAGATÓN","pr":"LEÓN"},{"c":"20106","n":"LA GRANJA","la":42.614874,"lo":-6.282495,"ce":"NO","fe":"NO","co":"","po":"TORRE DEL BIERZO","pr":"LEÓN"},{"c":"20109","n":"TORRE DEL BIERZO","la":42.595578,"lo":-6.329083,"ce":"NO","fe":"NO","co":"","po":"TORRE DEL BIERZO","pr":"LEÓN"},{"c":"20111","n":"BEMBIBRE","la":42.609558,"lo":-6.422048,"ce":"NO","fe":"NO","co":"","po":"BEMBIBRE","pr":"LEÓN"},{"c":"20113","n":"SAN MIGUEL DE LAS DUEÑAS","la":42.586392,"lo":-6.523776,"ce":"NO","fe":"NO","co":"","po":"CONGOSTO","pr":"LEÓN"},{"c":"20200","n":"PONFERRADA","la":42.545429,"lo":-6.602376,"ce":"NO","fe":"NO","co":"","po":"PONFERRADA","pr":"LEÓN"},{"c":"20203","n":"VILLADEPALOS","la":42.53686,"lo":-6.751109,"ce":"NO","fe":"NO","co":"","po":"CARRACEDELO","pr":"LEÓN"},{"c":"20204","n":"TORAL DE LOS VADOS","la":42.541052,"lo":-6.776703,"ce":"NO","fe":"NO","co":"","po":"TORAL DE LOS VADOS","pr":"LEÓN"},{"c":"20207","n":"COVAS","la":42.475326,"lo":-6.830878,"ce":"NO","fe":"NO","co":"","po":"RUBIÁ","pr":"OURENSE"},{"c":"20208","n":"QUEREÑO","la":42.420704,"lo":-6.829486,"ce":"NO","fe":"NO","co":"","po":"RUBIÁ","pr":"OURENSE"},{"c":"20210","n":"SOBRADELO","la":42.414859,"lo":-6.911951,"ce":"NO","fe":"NO","co":"","po":"CARBALLEDA DE VALDEORRAS","pr":"OURENSE"},{"c":"20211","n":"O BARCO DE VALDEORRAS","la":42.418301,"lo":-6.98503,"ce":"NO","fe":"NO","co":"","po":"BARCO DE VALDEORRAS (O)","pr":"OURENSE"},{"c":"20212","n":"VILAMARTÍN DE VALDEORRAS","la":42.411829,"lo":-7.061185,"ce":"NO","fe":"NO","co":"","po":"VILAMARTÍN DE VALDEORRAS","pr":"OURENSE"},{"c":"20213","n":"A RÚA-PETÍN","la":42.39276,"lo":-7.113284,"ce":"NO","fe":"NO","co":"","po":"RÚA (A)","pr":"OURENSE"},{"c":"20214","n":"MONTEFURADO","la":42.39402,"lo":-7.1984,"ce":"NO","fe":"NO","co":"","po":"QUIROGA","pr":"LUGO"},{"c":"20216","n":"SAN CLODIO-QUIROGA","la":42.465271,"lo":-7.287198,"ce":"NO","fe":"NO","co":"","po":"RIBAS DE SIL","pr":"LUGO"},{"c":"20218","n":"A POBRA DO BROLLÓN","la":42.533682,"lo":-7.400088,"ce":"NO","fe":"NO","co":"","po":"POBRA DO BROLLÓN (A)","pr":"LUGO"},{"c":"20300","n":"MONFORTE DE LEMOS","la":42.529682,"lo":-7.503589,"ce":"NO","fe":"NO","co":"","po":"MONFORTE DE LEMOS","pr":"LUGO"},{"c":"20305","n":"SARRIA","la":42.784049,"lo":-7.418822,"ce":"NO","fe":"NO","co":"","po":"SARRIA","pr":"LUGO"},{"c":"20306","n":"PEDRELO-CÉLTIGOS","la":42.832934,"lo":-7.393329,"ce":"NO","fe":"NO","co":"","po":"SARRIA","pr":"LUGO"},{"c":"20309","n":"LUGO","la":43.015222,"lo":-7.552176,"ce":"NO","fe":"NO","co":"","po":"LUGO","pr":"LUGO"},{"c":"20310","n":"RÁBADE","la":43.121378,"lo":-7.624835,"ce":"NO","fe":"NO","co":"","po":"RÁBADE","pr":"LUGO"},{"c":"20312","n":"BAAMONDE","la":43.173405,"lo":-7.756128,"ce":"NO","fe":"NO","co":"","po":"BEGONTE","pr":"LUGO"},{"c":"20313","n":"PARGA","la":43.163644,"lo":-7.837383,"ce":"NO","fe":"NO","co":"","po":"GUITIRIZ","pr":"LUGO"},{"c":"20314","n":"GUITIRIZ","la":43.179058,"lo":-7.895039,"ce":"NO","fe":"NO","co":"","po":"GUITIRIZ","pr":"LUGO"},{"c":"20316","n":"TEIXEIRO","la":43.141411,"lo":-8.03769,"ce":"NO","fe":"NO","co":"","po":"CURTIS","pr":"CORUÑA, A"},{"c":"20317","n":"CURTIS","la":43.127232,"lo":-8.143155,"ce":"NO","fe":"NO","co":"","po":"CURTIS","pr":"CORUÑA, A"},{"c":"20318","n":"PIÑOI","la":43.127922,"lo":-8.163498,"ce":"NO","fe":"NO","co":"","po":"CESURAS","pr":"CORUÑA, A"},{"c":"20319","n":"CESURAS","la":43.173073,"lo":-8.2005,"ce":"NO","fe":"NO","co":"","po":"CESURAS","pr":"CORUÑA, A"},{"c":"20320","n":"OZA DOS RÍOS","la":43.21877,"lo":-8.187111,"ce":"NO","fe":"NO","co":"","po":"OZA DOS RÍOS","pr":"CORUÑA, A"},{"c":"20400","n":"BETANZOS-INFESTA","la":43.270698,"lo":-8.225847,"ce":"NO","fe":"NO","co":"","po":"BETANZOS","pr":"CORUÑA, A"},{"c":"20402","n":"CECEBRE","la":43.287913,"lo":-8.307767,"ce":"NO","fe":"NO","co":"","po":"CAMBRE","pr":"CORUÑA, A"},{"c":"20403","n":"CAMBRE","la":43.290502,"lo":-8.352104,"ce":"NO","fe":"NO","co":"","po":"CAMBRE","pr":"CORUÑA, A"},{"c":"20404","n":"O BURGO-SANTIAGO","la":43.317841,"lo":-8.36875,"ce":"NO","fe":"NO","co":"","po":"CULLEREDO","pr":"CORUÑA, A"},{"c":"20410","n":"ELVIÑA-UNIVERSIDADE","la":43.335222,"lo":-8.413061,"ce":"NO","fe":"NO","co":"","po":"CORUÑA (A)","pr":"CORUÑA, A"},{"c":"21001","n":"BETANZOS-CIDADE","la":43.284137,"lo":-8.215874,"ce":"NO","fe":"NO","co":"","po":"BETANZOS","pr":"CORUÑA, A"},{"c":"21002","n":"MIÑO","la":43.349431,"lo":-8.207313,"ce":"NO","fe":"NO","co":"","po":"MIÑO","pr":"CORUÑA, A"},{"c":"21003","n":"PERBES","la":43.378197,"lo":-8.201106,"ce":"NO","fe":"NO","co":"","po":"MIÑO","pr":"CORUÑA, A"},{"c":"21004","n":"PONTEDEUME","la":43.411797,"lo":-8.180416,"ce":"NO","fe":"NO","co":"","po":"PONTEDEUME","pr":"CORUÑA, A"},{"c":"21005","n":"CABANAS","la":43.415585,"lo":-8.168828,"ce":"NO","fe":"NO","co":"","po":"CABANAS","pr":"CORUÑA, A"},{"c":"21007","n":"BARALLOBRE","la":43.462899,"lo":-8.188586,"ce":"NO","fe":"NO","co":"","po":"FENE","pr":"CORUÑA, A"},{"c":"21008","n":"PERLÍO","la":43.472309,"lo":-8.174837,"ce":"NO","fe":"NO","co":"","po":"FENE","pr":"CORUÑA, A"},{"c":"21009","n":"NEDA","la":43.495351,"lo":-8.160967,"ce":"NO","fe":"NO","co":"","po":"NEDA","pr":"CORUÑA, A"},{"c":"21010","n":"FERROL","la":43.4880467,"lo":-8.2310664,"ce":"SI","fe":"NO","co":"","po":"FERROL","pr":"CORUÑA, A"},{"c":"21913","n":"POLIGON INDUSTRIAL DEL SEGRE","la":41.6157446,"lo":0.6269556,"ce":"NO","fe":"NO","co":"","po":"LLEIDA","pr":"LLEIDA"},{"c":"22001","n":"CANAVAL","la":42.482882,"lo":-7.587733,"ce":"NO","fe":"NO","co":"","po":"SOBER","pr":"LUGO"},{"c":"22002","n":"AREAS","la":42.457799,"lo":-7.62879,"ce":"NO","fe":"NO","co":"","po":"SOBER","pr":"LUGO"},{"c":"22003","n":"SANTO ESTEVO DO SIL","la":42.426921,"lo":-7.661676,"ce":"NO","fe":"NO","co":"","po":"PANTÓN","pr":"LUGO"},{"c":"22004","n":"SAN PEDRO DO SIL","la":42.441353,"lo":-7.70412,"ce":"NO","fe":"NO","co":"","po":"PANTÓN","pr":"LUGO"},{"c":"22005","n":"OS PEARES","la":42.451439,"lo":-7.735523,"ce":"NO","fe":"NO","co":"","po":"PEROXA (A)","pr":"OURENSE"},{"c":"22006","n":"BARRA DE MIÑO","la":42.401095,"lo":-7.802567,"ce":"NO","fe":"NO","co":"","po":"COLES","pr":"OURENSE"},{"c":"22100","n":"OURENSE","la":42.350389,"lo":-7.872777,"ce":"NO","fe":"NO","co":"","po":"OURENSE","pr":"OURENSE"},{"c":"22101","n":"BARBANTES","la":42.338376,"lo":-8.011721,"ce":"NO","fe":"NO","co":"","po":"CENLLE","pr":"OURENSE"},{"c":"22102","n":"RIBADAVIA","la":42.2931,"lo":-8.139261,"ce":"NO","fe":"NO","co":"","po":"RIBADAVIA","pr":"OURENSE"},{"c":"22103","n":"FILGUEIRA","la":42.219917,"lo":-8.184788,"ce":"NO","fe":"NO","co":"","po":"CRECENTE","pr":"PONTEVEDRA"},{"c":"22104","n":"FRIEIRA","la":42.154882,"lo":-8.201036,"ce":"NO","fe":"NO","co":"","po":"CRECENTE","pr":"PONTEVEDRA"},{"c":"22105","n":"POUSA-CRECENTE","la":42.136705,"lo":-8.234889,"ce":"NO","fe":"NO","co":"","po":"CRECENTE","pr":"PONTEVEDRA"},{"c":"22106","n":"ARBO","la":42.107058,"lo":-8.300247,"ce":"NO","fe":"NO","co":"","po":"ARBO","pr":"PONTEVEDRA"},{"c":"22107","n":"SELA","la":42.092092,"lo":-8.355998,"ce":"NO","fe":"NO","co":"","po":"ARBO","pr":"PONTEVEDRA"},{"c":"22108","n":"AS NEVES","la":42.075462,"lo":-8.420074,"ce":"NO","fe":"NO","co":"","po":"NEVES (AS)","pr":"PONTEVEDRA"},{"c":"22109","n":"SALVATERRA","la":42.08164,"lo":-8.495141,"ce":"NO","fe":"NO","co":"","po":"SALVATERRA DE MIÑO","pr":"PONTEVEDRA"},{"c":"22110","n":"CALDELAS","la":42.055813,"lo":-8.566343,"ce":"NO","fe":"NO","co":"","po":"TUI","pr":"PONTEVEDRA"},{"c":"22200","n":"GUILLAREI","la":42.065663,"lo":-8.62253,"ce":"NO","fe":"NO","co":"","po":"TUI","pr":"PONTEVEDRA"},{"c":"22201","n":"O PORRIÑO","la":42.16419,"lo":-8.62202,"ce":"NO","fe":"NO","co":"","po":"PORRIÑO (O)","pr":"PONTEVEDRA"},{"c":"22300","n":"REDONDELA","la":42.286005,"lo":-8.619402,"ce":"NO","fe":"NO","co":"REDON","po":"REDONDELA","pr":"PONTEVEDRA"},{"c":"22308","n":"VIGO-GUIXAR","la":42.2392656,"lo":-8.7146089,"ce":"NO","fe":"NO","co":"VIGO-","po":"VIGO","pr":"PONTEVEDRA"},{"c":"22401","n":"TUI","la":42.056534,"lo":-8.642884,"ce":"NO","fe":"NO","co":"","po":"TUI","pr":"PONTEVEDRA"},{"c":"22402","n":"VALENÇA DO MINHO","la":42.024734,"lo":-8.639745,"ce":"NO","fe":"NO","co":"","po":"TUI","pr":"PONTEVEDRA"},{"c":"23000","n":"REDONDELA-PICOTA","la":42.286866,"lo":-8.607118,"ce":"NO","fe":"NO","co":"","po":"REDONDELA","pr":"PONTEVEDRA"},{"c":"23001","n":"CESANTES","la":42.310258,"lo":-8.616541,"ce":"NO","fe":"NO","co":"","po":"REDONDELA","pr":"PONTEVEDRA"},{"c":"23002","n":"ARCADE","la":42.340549,"lo":-8.611178,"ce":"NO","fe":"NO","co":"","po":"SOUTOMAIOR","pr":"PONTEVEDRA"},{"c":"23004","n":"PONTEVEDRA","la":42.421969,"lo":-8.635546,"ce":"NO","fe":"NO","co":"","po":"PONTEVEDRA","pr":"PONTEVEDRA"},{"c":"23005","n":"PORTELA","la":42.517801,"lo":-8.654609,"ce":"NO","fe":"NO","co":"","po":"BARRO","pr":"PONTEVEDRA"},{"c":"23008","n":"VILAGARCÍA DE AROUSA","la":42.602189,"lo":-8.762523,"ce":"NO","fe":"NO","co":"","po":"VILAGARCÍA DE AROUSA","pr":"PONTEVEDRA"},{"c":"23009","n":"CATOIRA","la":42.672166,"lo":-8.725291,"ce":"NO","fe":"NO","co":"","po":"CATOIRA","pr":"PONTEVEDRA"},{"c":"23010","n":"PONTECESURES","la":42.722985,"lo":-8.65213,"ce":"NO","fe":"NO","co":"","po":"PONTECESURES","pr":"PONTEVEDRA"},{"c":"23011","n":"PADRÓN","la":42.738967,"lo":-8.652614,"ce":"NO","fe":"NO","co":"","po":"PADRÓN","pr":"CORUÑA, A"},{"c":"23013","n":"OSEBE","la":42.825298,"lo":-8.61584,"ce":"NO","fe":"NO","co":"","po":"TEO","pr":"CORUÑA, A"},{"c":"23018","n":"PONTEVEDRA UNIVERSIDAD","la":42.4387499,"lo":-8.6304812,"ce":"NO","fe":"NO","co":"","po":"PONTEVEDRA","pr":"PONTEVEDRA"},{"c":"23021","n":"PADRÓN BARBANZA","la":42.738967,"lo":-8.652614,"ce":"NO","fe":"NO","co":"","po":"PADRÓN","pr":"CORUÑA, A"},{"c":"30000","n":"MONFRAGÜE","la":39.937464,"lo":-6.10091,"ce":"NO","fe":"NO","co":"","po":"MALPARTIDA DE PLASENCIA","pr":"CÁCERES"},{"c":"30002","n":"PLASENCIA","la":40.022282,"lo":-6.099397,"ce":"NO","fe":"NO","co":"","po":"PLASENCIA","pr":"CÁCERES"},{"c":"30100","n":"SALAMANCA","la":40.972235,"lo":-5.64899,"ce":"NO","fe":"NO","co":"SALAM","po":"SALAMANCA","pr":"SALAMANCA"},{"c":"30110","n":"SALAMANCA-LA ALAMEDILLA","la":40.966763,"lo":-5.656366,"ce":"NO","fe":"NO","co":"SALAM","po":"SALAMANCA","pr":"SALAMANCA"},{"c":"30200","n":"ZAMORA","la":41.515892,"lo":-5.739675,"ce":"NO","fe":"NO","co":"","po":"ZAMORA","pr":"ZAMORA"},{"c":"31002","n":"NAVA DEL REY","la":41.334716,"lo":-5.076818,"ce":"NO","fe":"NO","co":"","po":"NAVA DEL REY","pr":"VALLADOLID"},{"c":"31006","n":"TORO","la":41.512201,"lo":-5.384953,"ce":"NO","fe":"NO","co":"","po":"TORO","pr":"ZAMORA"},{"c":"31104","n":"CARBAJALES DE ALBA","la":41.681542,"lo":-5.971906,"ce":"NO","fe":"NO","co":"","po":"CARBAJALES DE ALBA","pr":"ZAMORA"},{"c":"31106","n":"FERRERUELA DE TÁBARA","la":41.764106,"lo":-6.0739,"ce":"NO","fe":"NO","co":"","po":"FERRERUELA DE HUERVA","pr":"ZAMORA"},{"c":"31107","n":"ABEJERA","la":41.80942,"lo":-6.141851,"ce":"NO","fe":"NO","co":"","po":"RIOFRÍO DE ALISTE","pr":"ZAMORA"},{"c":"31108","n":"SARRACÍN DE ALISTE","la":41.848497,"lo":-6.20513,"ce":"NO","fe":"NO","co":"","po":"RIOFRÍO DE ALISTE","pr":"ZAMORA"},{"c":"31109","n":"CABAÑAS DE ALISTE","la":41.854595,"lo":-6.24635,"ce":"NO","fe":"NO","co":"","po":"SAN VICENTE DE LA CABEZA","pr":"ZAMORA"},{"c":"31112","n":"LINAREJOS-PEDROSO","la":41.946963,"lo":-6.484541,"ce":"NO","fe":"NO","co":"","po":"MANZANAL DE ARRIBA","pr":"ZAMORA"},{"c":"31200","n":"PUEBLA DE SANABRIA","la":42.045763,"lo":-6.626848,"ce":"NO","fe":"NO","co":"PUEBL","po":"PUEBLA DE SANABRIA","pr":"ZAMORA"},{"c":"31303","n":"A FRIELA-MASIDE","la":42.411401,"lo":-8.028967,"ce":"NO","fe":"NO","co":"","po":"MASIDE","pr":"OURENSE"},{"c":"31304","n":"O CARBALLIÑO","la":42.43134,"lo":-8.068874,"ce":"NO","fe":"NO","co":"","po":"CARBALLIÑO (O)","pr":"OURENSE"},{"c":"31306","n":"O IRIXO","la":42.519719,"lo":-8.105174,"ce":"NO","fe":"NO","co":"","po":"IRIXO (O)","pr":"OURENSE"},{"c":"31308","n":"LALÍN","la":42.63253,"lo":-8.142715,"ce":"NO","fe":"NO","co":"","po":"LALÍN","pr":"PONTEVEDRA"},{"c":"31400","n":"SANTIAGO DE COMPOSTELA-DANIEL CASTELAO","la":42.870842,"lo":-8.544697,"ce":"NO","fe":"NO","co":"","po":"SANTIAGO DE COMPOSTELA","pr":"CORUÑA, A"},{"c":"31411","n":"UXES","la":43.297374,"lo":-8.444404,"ce":"NO","fe":"NO","co":"","po":"ARTEIXO","pr":"CORUÑA, A"},{"c":"31412","n":"A CORUÑA","la":43.3496932,"lo":-8.4155629,"ce":"NO","fe":"NO","co":"","po":"CORUÑA (A)","pr":"CORUÑA, A"},{"c":"31415","n":"ORDES","la":43.037544,"lo":-8.448447,"ce":"NO","fe":"NO","co":"","po":"ORDES","pr":"CORUÑA, A"},{"c":"31416","n":"CERCEDA-MEIRAMA","la":43.2078791,"lo":-8.4467723,"ce":"NO","fe":"NO","co":"","po":"CERCEDA","pr":"CORUÑA, A"},{"c":"32001","n":"CAMPILLO","la":41.259509,"lo":-5.017791,"ce":"NO","fe":"NO","co":"","po":"CAMPILLO (EL)","pr":"VALLADOLID"},{"c":"32002","n":"EL CARPIO","la":41.215464,"lo":-5.114466,"ce":"NO","fe":"NO","co":"","po":"CARPIO","pr":"VALLADOLID"},{"c":"32003","n":"FRESNO EL VIEJO","la":41.191351,"lo":-5.138061,"ce":"NO","fe":"NO","co":"","po":"FRESNO EL VIEJO","pr":"VALLADOLID"},{"c":"32004","n":"CANTALAPIEDRA","la":41.133585,"lo":-5.182961,"ce":"NO","fe":"NO","co":"","po":"CANTALAPIEDRA","pr":"SALAMANCA"},{"c":"32006","n":"EL PEDROSO DE LA ARMUÑA","la":41.079901,"lo":-5.406019,"ce":"NO","fe":"NO","co":"","po":"PEDROSO DE LA ARMUÑA (EL)","pr":"SALAMANCA"},{"c":"32007","n":"PITIEGUA","la":41.063741,"lo":-5.474174,"ce":"NO","fe":"NO","co":"","po":"PITIEGUA","pr":"SALAMANCA"},{"c":"32008","n":"GOMECELLO","la":41.041859,"lo":-5.541551,"ce":"NO","fe":"NO","co":"","po":"GOMECELLO","pr":"SALAMANCA"},{"c":"32009","n":"MORISCOS","la":41.011633,"lo":-5.584713,"ce":"NO","fe":"NO","co":"","po":"MORISCOS","pr":"SALAMANCA"},{"c":"34002","n":"CARDEÑOSA DE ÁVILA","la":40.73912,"lo":-4.75075,"ce":"NO","fe":"NO","co":"","po":"CARDEÑOSA","pr":"ÁVILA"},{"c":"34005","n":"SAN PEDRO DEL ARROYO","la":40.803841,"lo":-4.871407,"ce":"NO","fe":"NO","co":"","po":"SAN PEDRO DEL ARROYO","pr":"ÁVILA"},{"c":"34007","n":"CRESPOS","la":40.87011,"lo":-4.96803,"ce":"NO","fe":"NO","co":"","po":"CRESPOS","pr":"ÁVILA"},{"c":"34008","n":"NARROS DEL CASTILLO","la":40.866641,"lo":-5.052869,"ce":"NO","fe":"NO","co":"","po":"NARROS DEL CASTILLO","pr":"ÁVILA"},{"c":"34010","n":"PEÑARANDA DE BRACAMONTE","la":40.898138,"lo":-5.206361,"ce":"NO","fe":"NO","co":"","po":"PEÑARANDA DE BRACAMONTE","pr":"SALAMANCA"},{"c":"34011","n":"VILLAR DE GALLIMAZO","la":40.951981,"lo":-5.296183,"ce":"NO","fe":"NO","co":"","po":"VILLAR DE GALLIMAZO","pr":"SALAMANCA"},{"c":"34012","n":"BABILAFUENTE","la":40.972426,"lo":-5.430593,"ce":"NO","fe":"NO","co":"","po":"BABILAFUENTE","pr":"SALAMANCA"},{"c":"34013","n":"SAN MORALES","la":40.984243,"lo":-5.492955,"ce":"NO","fe":"NO","co":"","po":"SAN MORALES","pr":"SALAMANCA"},{"c":"34014","n":"ALDEALENGUA","la":40.97989,"lo":-5.552951,"ce":"NO","fe":"NO","co":"","po":"ALDEALENGUA","pr":"SALAMANCA"},{"c":"35001","n":"LEGANÉS","la":40.328643,"lo":-3.7713161,"ce":"SI","fe":"NO","co":"","po":"LEGANÉS","pr":"MADRID"},{"c":"35002","n":"FUENLABRADA","la":40.2833784,"lo":-3.7994429,"ce":"SI","fe":"NO","co":"","po":"FUENLABRADA","pr":"MADRID"},{"c":"35005","n":"ILLESCAS","la":40.12088,"lo":-3.842262,"ce":"NO","fe":"NO","co":"","po":"ILLESCAS","pr":"TOLEDO"},{"c":"35012","n":"HUMANES","la":40.2558101,"lo":-3.8287055,"ce":"SI","fe":"NO","co":"","po":"HUMANES DE MADRID","pr":"MADRID"},{"c":"35105","n":"TORRIJOS","la":39.979003,"lo":-4.283037,"ce":"NO","fe":"NO","co":"","po":"TORRIJOS","pr":"TOLEDO"},{"c":"35109","n":"MONTEARAGÓN","la":39.960996,"lo":-4.647093,"ce":"NO","fe":"NO","co":"","po":"MONTEARAGÓN","pr":"TOLEDO"},{"c":"35200","n":"TALAVERA DE LA REINA","la":39.970674,"lo":-4.826512,"ce":"NO","fe":"NO","co":"","po":"TALAVERA DE LA REINA","pr":"TOLEDO"},{"c":"35203","n":"OROPESA DE TOLEDO","la":39.921746,"lo":-5.186137,"ce":"NO","fe":"NO","co":"","po":"OROPESA","pr":"TOLEDO"},{"c":"35206","n":"NAVALMORAL DE LA MATA","la":39.894913,"lo":-5.545607,"ce":"NO","fe":"NO","co":"","po":"NAVALMORAL DE LA MATA","pr":"CÁCERES"},{"c":"35207","n":"CASATEJADA","la":39.891909,"lo":-5.677732,"ce":"NO","fe":"NO","co":"","po":"CASATEJADA","pr":"CÁCERES"},{"c":"35301","n":"MIRABEL","la":39.866229,"lo":-6.228969,"ce":"NO","fe":"NO","co":"","po":"MIRABEL","pr":"CÁCERES"},{"c":"35302","n":"CASAS DE MILLÁN","la":39.811866,"lo":-6.326045,"ce":"NO","fe":"NO","co":"","po":"CASAS DE MILLÁN","pr":"CÁCERES"},{"c":"35303","n":"CAÑAVERAL","la":39.789124,"lo":-6.375031,"ce":"NO","fe":"NO","co":"","po":"CAÑAVERAL","pr":"CÁCERES"},{"c":"35400","n":"CÁCERES","la":39.461131,"lo":-6.385679,"ce":"NO","fe":"NO","co":"","po":"CÁCERES","pr":"CÁCERES"},{"c":"35402","n":"ARROYO DE MALPARTIDA","la":39.468078,"lo":-6.533634,"ce":"NO","fe":"NO","co":"","po":"CÁCERES","pr":"CÁCERES"},{"c":"35405","n":"SAN VICENTE DE ALCÁNTARA","la":39.381561,"lo":-7.117075,"ce":"NO","fe":"NO","co":"","po":"SAN VICENTE DE ALCÁNTARA","pr":"BADAJOZ"},{"c":"35406","n":"VALENCIA DE ALCÁNTARA","la":39.426928,"lo":-7.230688,"ce":"NO","fe":"NO","co":"","po":"VALENCIA DE ALCÁNTARA","pr":"CÁCERES"},{"c":"37200","n":"CIUDAD REAL","la":38.9853,"lo":-3.913633,"ce":"NO","fe":"NO","co":"","po":"CIUDAD REAL","pr":"CIUDAD REAL"},{"c":"37300","n":"PUERTOLLANO","la":38.69128,"lo":-4.111655,"ce":"NO","fe":"NO","co":"","po":"PUERTOLLANO","pr":"CIUDAD REAL"},{"c":"37302","n":"BRAZATORTAS-VEREDAS","la":38.668758,"lo":-4.316468,"ce":"NO","fe":"NO","co":"","po":"BRAZATORTAS","pr":"CIUDAD REAL"},{"c":"37305","n":"ALMADENEJOS-ALMADÉN","la":38.740578,"lo":-4.730387,"ce":"NO","fe":"NO","co":"","po":"ALMADENEJOS","pr":"CIUDAD REAL"},{"c":"37308","n":"GUADALMEZ-LOS PEDROCHES","la":38.69921,"lo":-4.929771,"ce":"NO","fe":"NO","co":"","po":"GUADALMEZ","pr":"CIUDAD REAL"},{"c":"37311","n":"CABEZA DEL BUEY","la":38.72389,"lo":-5.227067,"ce":"NO","fe":"NO","co":"","po":"CABEZA DEL BUEY","pr":"BADAJOZ"},{"c":"37400","n":"ALMORCHÓN","la":38.696631,"lo":-5.290496,"ce":"NO","fe":"NO","co":"","po":"CABEZA DEL BUEY","pr":"BADAJOZ"},{"c":"37402","n":"CASTUERA","la":38.735021,"lo":-5.541637,"ce":"NO","fe":"NO","co":"","po":"CASTUERA","pr":"BADAJOZ"},{"c":"37404","n":"CAMPANARIO","la":38.853395,"lo":-5.641415,"ce":"NO","fe":"NO","co":"","po":"CAMPANARIO","pr":"BADAJOZ"},{"c":"37406","n":"VILLANUEVA DE LA SERENA","la":38.96886,"lo":-5.7965,"ce":"NO","fe":"NO","co":"","po":"VILLANUEVA DE LA SERENA","pr":"BADAJOZ"},{"c":"37407","n":"DON BENITO","la":38.96695,"lo":-5.862923,"ce":"NO","fe":"NO","co":"","po":"DON BENITO","pr":"BADAJOZ"},{"c":"37409","n":"VALDETORRES","la":38.913301,"lo":-6.069407,"ce":"NO","fe":"NO","co":"","po":"VALDETORRES","pr":"BADAJOZ"},{"c":"37410","n":"GUAREÑA","la":38.896749,"lo":-6.128842,"ce":"NO","fe":"NO","co":"","po":"GUAREÑA","pr":"BADAJOZ"},{"c":"37500","n":"MÉRIDA","la":38.921503,"lo":-6.343794,"ce":"NO","fe":"NO","co":"","po":"MÉRIDA","pr":"BADAJOZ"},{"c":"37603","n":"MONTIJO","la":38.913539,"lo":-6.598577,"ce":"NO","fe":"NO","co":"","po":"MONTIJO","pr":"BADAJOZ"},{"c":"37604","n":"GUADIANA","la":38.922099,"lo":-6.689998,"ce":"NO","fe":"NO","co":"","po":"GUADIANA DEL CAUDILLO","pr":"BADAJOZ"},{"c":"37606","n":"BADAJOZ","la":38.890696,"lo":-6.981753,"ce":"NO","fe":"NO","co":"","po":"BADAJOZ","pr":"BADAJOZ"},{"c":"37608","n":"MONTIJO-EL MOLINO","la":38.913973,"lo":-6.618281,"ce":"NO","fe":"NO","co":"","po":"MONTIJO","pr":"BADAJOZ"},{"c":"37611","n":"GARROVILLA-LAS VEGAS","la":38.915763,"lo":-6.47408,"ce":"NO","fe":"NO","co":"","po":"GARROVILLA (LA)","pr":"BADAJOZ"},{"c":"37704","n":"VILLANUEVA DE CÓRDOBA","la":38.2554049,"lo":-4.570952,"ce":"NO","fe":"NO","co":"","po":"VILLANUEVA DE CÓRDOBA","pr":"CÓRDOBA"},{"c":"40002","n":"CALAMONTE","la":38.886931,"lo":-6.382965,"ce":"NO","fe":"NO","co":"","po":"CALAMONTE","pr":"BADAJOZ"},{"c":"40004","n":"ALMENDRALEJO","la":38.684662,"lo":-6.399815,"ce":"NO","fe":"NO","co":"","po":"ALMENDRALEJO","pr":"BADAJOZ"},{"c":"40005","n":"VILLAFRANCA DE LOS BARROS","la":38.564402,"lo":-6.352048,"ce":"NO","fe":"NO","co":"","po":"VILLAFRANCA DE LOS BARROS","pr":"BADAJOZ"},{"c":"40006","n":"LOS SANTOS DE MAIMONA","la":38.449724,"lo":-6.361749,"ce":"NO","fe":"NO","co":"","po":"SANTOS DE MAIMONA (LOS)","pr":"BADAJOZ"},{"c":"40008","n":"ZAFRA FERIA","la":38.424403,"lo":-6.410084,"ce":"NO","fe":"NO","co":"","po":"ZAFRA","pr":"BADAJOZ"},{"c":"40100","n":"ZAFRA","la":38.413635,"lo":-6.405083,"ce":"NO","fe":"NO","co":"","po":"ZAFRA","pr":"BADAJOZ"},{"c":"40105","n":"LLERENA","la":38.237,"lo":-6.009017,"ce":"NO","fe":"NO","co":"","po":"LLERENA","pr":"BADAJOZ"},{"c":"40107","n":"FUENTE DEL ARCO","la":38.16353,"lo":-5.900484,"ce":"NO","fe":"NO","co":"","po":"FUENTE DEL ARCO","pr":"BADAJOZ"},{"c":"40108","n":"GUADALCANAL","la":38.090197,"lo":-5.803388,"ce":"NO","fe":"NO","co":"","po":"GUADALCANAL","pr":"SEVILLA"},{"c":"40113","n":"CAZALLA-CONSTANTINA","la":37.9328637,"lo":-5.704433,"ce":"SI","fe":"NO","co":"","po":"CONSTANTINA","pr":"SEVILLA"},{"c":"40115","n":"PEDROSO","la":37.8373919,"lo":-5.7624522,"ce":"SI","fe":"NO","co":"","po":"PEDROSO (EL)","pr":"SEVILLA"},{"c":"40119","n":"VILLANUEVA DEL RÍO-MINAS","la":37.6617048,"lo":-5.7121543,"ce":"SI","fe":"NO","co":"","po":"VILLANUEVA DEL RÍO Y MINAS","pr":"SEVILLA"},{"c":"40122","n":"TOCINA","la":37.6093044,"lo":-5.7316939,"ce":"SI","fe":"NO","co":"","po":"TOCINA","pr":"SEVILLA"},{"c":"42005","n":"FREGENAL DE LA SIERRA","la":38.167613,"lo":-6.637909,"ce":"NO","fe":"NO","co":"","po":"FREGENAL DE LA SIERRA","pr":"BADAJOZ"},{"c":"42006","n":"CUMBRES MAYORES","la":38.053126,"lo":-6.631553,"ce":"NO","fe":"NO","co":"","po":"CUMBRES MAYORES","pr":"HUELVA"},{"c":"42008","n":"JABUGO-GALAROZA","la":37.928243,"lo":-6.773908,"ce":"NO","fe":"NO","co":"","po":"JABUGO","pr":"HUELVA"},{"c":"42009","n":"ALMONASTER-CORTEGANA","la":37.901174,"lo":-6.797372,"ce":"NO","fe":"NO","co":"","po":"ALMONASTER LA REAL","pr":"HUELVA"},{"c":"42012","n":"VALDELAMUSA","la":37.787111,"lo":-6.873729,"ce":"NO","fe":"NO","co":"","po":"CORTEGANA","pr":"HUELVA"},{"c":"42013","n":"EL TAMUJOSO","la":37.720339,"lo":-6.900554,"ce":"NO","fe":"NO","co":"","po":"CERRO DE ANDÉVALO (EL)","pr":"HUELVA"},{"c":"42015","n":"CALAÑAS","la":37.652007,"lo":-6.875841,"ce":"NO","fe":"NO","co":"","po":"CALAÑAS","pr":"HUELVA"},{"c":"42016","n":"LOS MILANOS","la":37.586219,"lo":-6.919938,"ce":"NO","fe":"NO","co":"","po":"CALAÑAS","pr":"HUELVA"},{"c":"42018","n":"EL COBUJÓN","la":37.516509,"lo":-6.953428,"ce":"NO","fe":"NO","co":"","po":"CALAÑAS","pr":"HUELVA"},{"c":"42019","n":"BELMONTE","la":37.461864,"lo":-6.947533,"ce":"NO","fe":"NO","co":"","po":"GIBRALEÓN","pr":"HUELVA"},{"c":"42020","n":"GIBRALEÓN","la":37.36852,"lo":-6.96207,"ce":"NO","fe":"NO","co":"","po":"GIBRALEÓN","pr":"HUELVA"},{"c":"43005","n":"BENACAZÓN","la":37.3568512,"lo":-6.2082011,"ce":"SI","fe":"NO","co":"","po":"BENACAZÓN","pr":"SEVILLA"},{"c":"43008","n":"CARRIÓN DE LOS CÉSPEDES","la":37.368955,"lo":-6.335088,"ce":"NO","fe":"NO","co":"","po":"CARRIÓN DE LOS CÉSPEDES","pr":"SEVILLA"},{"c":"43009","n":"ESCACENA","la":37.397812,"lo":-6.39198,"ce":"NO","fe":"NO","co":"","po":"ESCACENA DEL CAMPO","pr":"HUELVA"},{"c":"43011","n":"LA PALMA DEL CONDADO","la":37.390665,"lo":-6.554444,"ce":"NO","fe":"NO","co":"","po":"PALMA DEL CONDADO (LA)","pr":"HUELVA"},{"c":"43012","n":"VILLARRASA","la":37.386999,"lo":-6.598819,"ce":"NO","fe":"NO","co":"","po":"VILLARRASA","pr":"HUELVA"},{"c":"43015","n":"NIEBLA-PUERTA DEL BUEY","la":37.3587619,"lo":-6.6812578,"ce":"NO","fe":"NO","co":"","po":"NIEBLA","pr":"HUELVA"},{"c":"43019","n":"HUELVA","la":37.2525922,"lo":-6.9448154,"ce":"NO","fe":"NO","co":"","po":"HUELVA","pr":"HUELVA"},{"c":"43021","n":"SAN JUAN DEL PUERTO","la":37.311898,"lo":-6.841076,"ce":"NO","fe":"NO","co":"","po":"SAN JUAN DEL PUERTO","pr":"HUELVA"},{"c":"50002","n":"CINCO CASAS","la":39.169282,"lo":-3.232663,"ce":"NO","fe":"NO","co":"","po":"ALCÁZAR DE SAN JUAN","pr":"CIUDAD REAL"},{"c":"50100","n":"MANZANARES","la":39.005837,"lo":-3.370507,"ce":"NO","fe":"NO","co":"","po":"MANZANARES","pr":"CIUDAD REAL"},{"c":"50102","n":"VALDEPEÑAS","la":38.762868,"lo":-3.39572,"ce":"NO","fe":"NO","co":"","po":"VALDEPEÑAS","pr":"CIUDAD REAL"},{"c":"50200","n":"SANTA CRUZ DE MUDELA","la":38.644428,"lo":-3.451493,"ce":"NO","fe":"NO","co":"","po":"SANTA CRUZ DE MUDELA","pr":"CIUDAD REAL"},{"c":"50202","n":"ALMURADIEL-VISO DEL MARQUÉS","la":38.514267,"lo":-3.501935,"ce":"NO","fe":"NO","co":"","po":"ALMURADIEL","pr":"CIUDAD REAL"},{"c":"50207","n":"VILCHES","la":38.215742,"lo":-3.517576,"ce":"NO","fe":"NO","co":"","po":"VILCHES","pr":"JAÉN"},{"c":"50300","n":"LINARES-BAEZA","la":38.068864,"lo":-3.589396,"ce":"NO","fe":"NO","co":"","po":"LINARES","pr":"JAÉN"},{"c":"50400","n":"ESPELÚY","la":38.010247,"lo":-3.832726,"ce":"NO","fe":"NO","co":"","po":"ESPELÚY","pr":"JAÉN"},{"c":"50403","n":"ANDÚJAR","la":38.028225,"lo":-4.066036,"ce":"NO","fe":"NO","co":"","po":"ANDÚJAR","pr":"JAÉN"},{"c":"50407","n":"VILLA DEL RÍO","la":37.981331,"lo":-4.283788,"ce":"NO","fe":"NO","co":"","po":"VILLA DEL RÍO","pr":"CÓRDOBA"},{"c":"50413","n":"ALCOLEA DE CÓRDOBA","la":37.922326,"lo":-4.694751,"ce":"NO","fe":"NO","co":"","po":"CÓRDOBA","pr":"CÓRDOBA"},{"c":"50417","n":"CAMPUS UNIVERSITARIO DE RABANALES","la":37.91256,"lo":-4.72086,"ce":"NO","fe":"NO","co":"","po":"CÓRDOBA","pr":"CÓRDOBA"},{"c":"50500","n":"CÓRDOBA-JULIO ANGUITA","la":37.888291,"lo":-4.789453,"ce":"NO","fe":"NO","co":"","po":"CÓRDOBA","pr":"CÓRDOBA"},{"c":"50501","n":"EL HIGUERÓN","la":37.870271,"lo":-4.838942,"ce":"NO","fe":"NO","co":"","po":"CÓRDOBA","pr":"CÓRDOBA"},{"c":"50502","n":"VILLARRUBIA DE CÓRDOBA","la":37.847574,"lo":-4.915339,"ce":"NO","fe":"NO","co":"","po":"CÓRDOBA","pr":"CÓRDOBA"},{"c":"50504","n":"POSADAS","la":37.803986,"lo":-5.106325,"ce":"NO","fe":"NO","co":"","po":"POSADAS","pr":"CÓRDOBA"},{"c":"50506","n":"PALMA DEL RÍO","la":37.718081,"lo":-5.29276,"ce":"NO","fe":"NO","co":"","po":"PALMA DEL RÍO","pr":"CÓRDOBA"},{"c":"50507","n":"PEÑAFLOR","la":37.707502,"lo":-5.341609,"ce":"NO","fe":"NO","co":"","po":"PEÑAFLOR","pr":"SEVILLA"},{"c":"50600","n":"LORA DEL RÍO","la":37.6613212,"lo":-5.5295514,"ce":"SI","fe":"NO","co":"","po":"LORA DEL RÍO","pr":"SEVILLA"},{"c":"50700","n":"LOS ROSALES","la":37.5899718,"lo":-5.7261208,"ce":"SI","fe":"NO","co":"","po":"TOCINA","pr":"SEVILLA"},{"c":"51003","n":"SEVILLA-SANTA JUSTA","la":37.3924955,"lo":-5.9749269,"ce":"SI","fe":"NO","co":"","po":"SEVILLA","pr":"SEVILLA"},{"c":"51100","n":"SAN BERNARDO","la":37.3777778,"lo":-5.9796142,"ce":"SI","fe":"NO","co":"","po":"SEVILLA","pr":"SEVILLA"},{"c":"51103","n":"DOS HERMANAS","la":37.2872259,"lo":-5.9235322,"ce":"SI","fe":"NO","co":"","po":"DOS HERMANAS","pr":"SEVILLA"},{"c":"51110","n":"VIRGEN DEL ROCÍO","la":37.3628091,"lo":-5.9760105,"ce":"SI","fe":"NO","co":"","po":"SEVILLA","pr":"SEVILLA"},{"c":"51111","n":"BELLAVISTA","la":37.3215188,"lo":-5.9641924,"ce":"SI","fe":"NO","co":"","po":"SEVILLA","pr":"SEVILLA"},{"c":"51200","n":"UTRERA","la":37.1848178,"lo":-5.7907537,"ce":"SI","fe":"NO","co":"","po":"UTRERA","pr":"SEVILLA"},{"c":"51202","n":"LAS CABEZAS DE SAN JUAN","la":37.0194897,"lo":-5.94658,"ce":"SI","fe":"NO","co":"","po":"CABEZAS DE SAN JUAN (LAS)","pr":"SEVILLA"},{"c":"51203","n":"LEBRIJA","la":36.9116378,"lo":-6.0948487,"ce":"SI","fe":"NO","co":"","po":"LEBRIJA","pr":"SEVILLA"},{"c":"51205","n":"AEROPUERTO DE JEREZ","la":36.7515886,"lo":-6.0659384,"ce":"SI","fe":"NO","co":"","po":"JEREZ DE LA FRONTERA","pr":"CÁDIZ"},{"c":"51300","n":"JEREZ DE LA FRONTERA","la":36.680022,"lo":-6.1266032,"ce":"SI","fe":"NO","co":"","po":"JEREZ DE LA FRONTERA","pr":"CÁDIZ"},{"c":"51400","n":"PUERTO DE SANTA MARÍA","la":36.6040723,"lo":-6.2179261,"ce":"SI","fe":"NO","co":"","po":"PUERTO DE SANTA MARÍA (EL)","pr":"CÁDIZ"},{"c":"51401","n":"PUERTO REAL","la":36.5309155,"lo":-6.1853143,"ce":"SI","fe":"NO","co":"","po":"PUERTO REAL","pr":"CÁDIZ"},{"c":"51404","n":"SEGUNDA AGUADA","la":36.5135317,"lo":-6.2770128,"ce":"SI","fe":"NO","co":"","po":"CÁDIZ","pr":"CÁDIZ"},{"c":"51405","n":"CÁDIZ","la":36.528935,"lo":-6.2879716,"ce":"SI","fe":"NO","co":"","po":"CÁDIZ","pr":"CÁDIZ"},{"c":"51406","n":"SAN FERNANDO-BAHÍA SUR","la":36.4680834,"lo":-6.2067676,"ce":"SI","fe":"NO","co":"S FER","po":"SAN FERNANDO","pr":"CÁDIZ"},{"c":"51409","n":"CÁDIZ-ESTADIO","la":36.5029461,"lo":-6.2720644,"ce":"SI","fe":"NO","co":"","po":"CÁDIZ","pr":"CÁDIZ"},{"c":"54400","n":"BOBADILLA","la":37.037073,"lo":-4.727942,"ce":"NO","fe":"NO","co":"ANTEQ","po":"ANTEQUERA","pr":"MÁLAGA"},{"c":"54403","n":"EL CHORRO-CAMINITO DEL REY","la":36.907335,"lo":-4.759258,"ce":"NO","fe":"NO","co":"","po":"ÁLORA","pr":"MÁLAGA"},{"c":"54404","n":"LAS MELLIZAS","la":36.873306,"lo":-4.719433,"ce":"NO","fe":"NO","co":"","po":"ÁLORA","pr":"MÁLAGA"},{"c":"54405","n":"ÁLORA","la":36.8198747,"lo":-4.6996105,"ce":"SI","fe":"NO","co":"","po":"ÁLORA","pr":"MÁLAGA"},{"c":"54406","n":"PIZARRA","la":36.7641515,"lo":-4.7118313,"ce":"SI","fe":"NO","co":"","po":"PIZARRA","pr":"MÁLAGA"},{"c":"54407","n":"ALJAIMA","la":36.7330833,"lo":-4.6645001,"ce":"SI","fe":"NO","co":"","po":"CÁRTAMA","pr":"MÁLAGA"},{"c":"54408","n":"CÁRTAMA","la":36.7337392,"lo":-4.6083966,"ce":"SI","fe":"NO","co":"","po":"CÁRTAMA","pr":"MÁLAGA"},{"c":"54410","n":"CAMPANILLAS","la":36.7050436,"lo":-4.5454825,"ce":"SI","fe":"NO","co":"","po":"MÁLAGA","pr":"MÁLAGA"},{"c":"54412","n":"MÁLAGA-LOS PRADOS","la":36.6986108,"lo":-4.47815,"ce":"SI","fe":"NO","co":"","po":"MÁLAGA","pr":"MÁLAGA"},{"c":"54413","n":"MÁLAGA MARÍA ZAMBRANO","la":36.7113388,"lo":-4.4313888,"ce":"SI","fe":"NO","co":"","po":"MÁLAGA","pr":"MÁLAGA"},{"c":"54501","n":"VICTORIA KENT","la":36.7012229,"lo":-4.4544145,"ce":"SI","fe":"NO","co":"","po":"MÁLAGA","pr":"MÁLAGA"},{"c":"54517","n":"MÁLAGA-CENTRO ALAMEDA","la":36.7159539,"lo":-4.4265335,"ce":"SI","fe":"NO","co":"","po":"MÁLAGA","pr":"MÁLAGA"},{"c":"55001","n":"CAMPILLOS","la":37.032231,"lo":-4.863499,"ce":"NO","fe":"NO","co":"","po":"CAMPILLOS","pr":"MÁLAGA"},{"c":"55003","n":"ALMARGEN-CAÑETE LA REAL","la":37.000985,"lo":-5.020111,"ce":"NO","fe":"NO","co":"","po":"ALMARGEN","pr":"MÁLAGA"},{"c":"55005","n":"SETENIL","la":36.863423,"lo":-5.121375,"ce":"NO","fe":"NO","co":"","po":"SETENIL DE LAS BODEGAS","pr":"CÁDIZ"},{"c":"55007","n":"RONDA","la":36.748401,"lo":-5.16197,"ce":"NO","fe":"NO","co":"","po":"RONDA","pr":"MÁLAGA"},{"c":"55008","n":"ARRIATE","la":36.7905949,"lo":-5.140757,"ce":"NO","fe":"NO","co":"","po":"ARRIATE","pr":"MÁLAGA"},{"c":"55010","n":"BENAOJÁN-MONTEJAQUE","la":36.713753,"lo":-5.246366,"ce":"NO","fe":"NO","co":"","po":"BENAOJÁN","pr":"MÁLAGA"},{"c":"55011","n":"JIMERA DE LÍBAR","la":36.660678,"lo":-5.281473,"ce":"NO","fe":"NO","co":"","po":"JIMERA DE LÍBAR","pr":"MÁLAGA"},{"c":"55012","n":"CORTES DE LA FRONTERA","la":36.597364,"lo":-5.332784,"ce":"NO","fe":"NO","co":"","po":"CORTES DE LA FRONTERA","pr":"MÁLAGA"},{"c":"55013","n":"GAUCÍN","la":36.540372,"lo":-5.386825,"ce":"NO","fe":"NO","co":"","po":"CORTES DE LA FRONTERA","pr":"MÁLAGA"},{"c":"55014","n":"SAN PABLO","la":36.467952,"lo":-5.418921,"ce":"NO","fe":"NO","co":"","po":"JIMENA DE LA FRONTERA","pr":"CÁDIZ"},{"c":"55015","n":"JIMENA DE LA FRONTERA","la":36.4242,"lo":-5.434113,"ce":"NO","fe":"NO","co":"","po":"JIMENA DE LA FRONTERA","pr":"CÁDIZ"},{"c":"55017","n":"ALMORAIMA","la":36.27751,"lo":-5.430529,"ce":"NO","fe":"NO","co":"","po":"CASTELLAR DE LA FRONTERA","pr":"CÁDIZ"},{"c":"55018","n":"SAN ROQUE-LA LÍNEA","la":36.214482,"lo":-5.432399,"ce":"NO","fe":"NO","co":"LALIN","po":"SAN ROQUE","pr":"CÁDIZ"},{"c":"55019","n":"LOS BARRIOS","la":36.173998,"lo":-5.460801,"ce":"NO","fe":"NO","co":"","po":"BARRIOS (LOS)","pr":"CÁDIZ"},{"c":"55020","n":"ALGECIRAS","la":36.126831,"lo":-5.451108,"ce":"NO","fe":"NO","co":"ALGEC","po":"ALGECIRAS","pr":"CÁDIZ"},{"c":"56004","n":"JÓDAR-ÚBEDA","la":37.913343,"lo":-3.34892,"ce":"NO","fe":"NO","co":"","po":"JÓDAR","pr":"JAÉN"},{"c":"56009","n":"CABRA DEL SANTO CRISTO Y ALICÚN","la":37.6567129,"lo":-3.262623,"ce":"NO","fe":"NO","co":"","po":"CABRA DEL SANTO CRISTO","pr":"JAÉN"},{"c":"56100","n":"MOREDA","la":37.431216,"lo":-3.310516,"ce":"NO","fe":"NO","co":"","po":"MORELÁBOR","pr":"GRANADA"},{"c":"56103","n":"BENALÚA DE GUADIX","la":37.345277,"lo":-3.163177,"ce":"NO","fe":"NO","co":"","po":"BENALÚA","pr":"GRANADA"},{"c":"56200","n":"GUADIX","la":37.316873,"lo":-3.127209,"ce":"NO","fe":"NO","co":"","po":"GUADIX","pr":"GRANADA"},{"c":"56301","n":"FIÑANA","la":37.184647,"lo":-2.839757,"ce":"NO","fe":"NO","co":"","po":"FIÑANA","pr":"ALMERÍA"},{"c":"56305","n":"GÉRGAL","la":37.108847,"lo":-2.591556,"ce":"NO","fe":"NO","co":"","po":"GÉRGAL","pr":"ALMERÍA"},{"c":"56308","n":"GÁDOR","la":36.951624,"lo":-2.487658,"ce":"NO","fe":"NO","co":"","po":"GÁDOR","pr":"ALMERÍA"},{"c":"56310","n":"HUERCAL-VIATOR","la":36.885155,"lo":-2.436718,"ce":"NO","fe":"NO","co":"","po":"HUÉRCAL DE ALMERÍA","pr":"ALMERÍA"},{"c":"56312","n":"ALMERÍA","la":36.834951,"lo":-2.455519,"ce":"NO","fe":"NO","co":"","po":"ALMERÍA","pr":"ALMERÍA"},{"c":"57003","n":"IZNALLOZ","la":37.395852,"lo":-3.527947,"ce":"NO","fe":"NO","co":"","po":"IZNALLOZ","pr":"GRANADA"},{"c":"60000","n":"MADRID-PUERTA DE ATOCHA-ALMUDENA GRANDES","la":40.406442,"lo":-3.690886,"ce":"SI","fe":"NO","co":"MADRI","po":"MADRID","pr":"MADRID"},{"c":"60200","n":"ARANJUEZ","la":40.0350257,"lo":-3.6182534,"ce":"SI","fe":"NO","co":"","po":"ARANJUEZ","pr":"MADRID"},{"c":"60202","n":"CASTILLEJO-AÑOVER","la":39.949634,"lo":-3.738774,"ce":"NO","fe":"NO","co":"","po":"ARANJUEZ","pr":"MADRID"},{"c":"60203","n":"VILLASEQUILLA","la":39.879535,"lo":-3.728453,"ce":"NO","fe":"NO","co":"","po":"VILLASEQUILLA","pr":"TOLEDO"},{"c":"60206","n":"TEMBLEQUE","la":39.722958,"lo":-3.497354,"ce":"NO","fe":"NO","co":"","po":"TEMBLEQUE","pr":"TOLEDO"},{"c":"60207","n":"EL ROMERAL","la":39.694516,"lo":-3.430502,"ce":"NO","fe":"NO","co":"","po":"ROMERAL (EL)","pr":"TOLEDO"},{"c":"60300","n":"VILLACAÑAS","la":39.622698,"lo":-3.33051,"ce":"NO","fe":"NO","co":"","po":"VILLACAÑAS","pr":"TOLEDO"},{"c":"60301","n":"QUERO","la":39.504173,"lo":-3.266072,"ce":"NO","fe":"NO","co":"","po":"QUERO","pr":"TOLEDO"},{"c":"60400","n":"ALCÁZAR DE SAN JUAN","la":39.395628,"lo":-3.205744,"ce":"NO","fe":"NO","co":"","po":"ALCÁZAR DE SAN JUAN","pr":"CIUDAD REAL"},{"c":"60402","n":"CAMPO DE CRIPTANA","la":39.394343,"lo":-3.117746,"ce":"NO","fe":"NO","co":"","po":"CAMPO DE CRIPTANA","pr":"CIUDAD REAL"},{"c":"60406","n":"SOCUÉLLAMOS","la":39.278776,"lo":-2.775571,"ce":"NO","fe":"NO","co":"","po":"SOCUÉLLAMOS","pr":"CIUDAD REAL"},{"c":"60500","n":"VILLARROBLEDO","la":39.260868,"lo":-2.598621,"ce":"NO","fe":"NO","co":"","po":"VILLARROBLEDO","pr":"ALBACETE"},{"c":"60503","n":"MINAYA","la":39.240738,"lo":-2.348403,"ce":"NO","fe":"NO","co":"","po":"MINAYA","pr":"ALBACETE"},{"c":"60505","n":"LA RODA DE ALBACETE","la":39.199594,"lo":-2.162547,"ce":"NO","fe":"NO","co":"","po":"RODA (LA)","pr":"ALBACETE"},{"c":"60507","n":"LA GINETA","la":39.111665,"lo":-2.000155,"ce":"NO","fe":"NO","co":"","po":"GINETA (LA)","pr":"ALBACETE"},{"c":"60600","n":"ALBACETE-LOS LLANOS","la":38.999384,"lo":-1.84845,"ce":"NO","fe":"NO","co":"","po":"ALBACETE","pr":"ALBACETE"},{"c":"60800","n":"ALMANSA","la":38.867822,"lo":-1.105446,"ce":"NO","fe":"NO","co":"","po":"ALMANSA","pr":"ALBACETE"},{"c":"60900","n":"LA ENCINA","la":38.765344,"lo":-0.954244,"ce":"NO","fe":"NO","co":"","po":"VILLENA","pr":"ALICANTE/ALACANT"},{"c":"60901","n":"CAUDETE","la":38.716163,"lo":-0.959727,"ce":"NO","fe":"NO","co":"","po":"CAUDETE","pr":"ALBACETE"},{"c":"60902","n":"VILLENA","la":38.631738,"lo":-0.867689,"ce":"NO","fe":"NO","co":"","po":"VILLENA","pr":"ALICANTE/ALACANT"},{"c":"60904","n":"SAX","la":38.544251,"lo":-0.813729,"ce":"NO","fe":"NO","co":"","po":"SAX","pr":"ALICANTE/ALACANT"},{"c":"60905","n":"ELDA-PETRER","la":38.484879,"lo":-0.80109,"ce":"NO","fe":"NO","co":"","po":"ELDA","pr":"ALICANTE/ALACANT"},{"c":"60907","n":"NOVELDA-ASPE","la":38.407086,"lo":-0.777744,"ce":"NO","fe":"NO","co":"","po":"NOVELDA","pr":"ALICANTE/ALACANT"},{"c":"60911","n":"ALICANTE/ALACANT-TERMINAL","la":38.3447127,"lo":-0.4955241,"ce":"SI","fe":"NO","co":"","po":"ALICANTE/ALACANT","pr":"ALICANTE/ALACANT"},{"c":"60913","n":"SANT VICENT CENTRE","la":38.3946533,"lo":-0.5287247,"ce":"SI","fe":"NO","co":"","po":"SAN VICENTE DEL RASPEIG/SANT VICENT DEL RASPEIG","pr":"ALICANTE/ALACANT"},{"c":"60914","n":"UNIVERSIDAD DE ALICANTE","la":38.384165,"lo":-0.528411,"ce":"SI","fe":"NO","co":"","po":"ALICANTE/ALACANT","pr":"ALICANTE/ALACANT"},{"c":"61005","n":"HELLÍN","la":38.508776,"lo":-1.688437,"ce":"NO","fe":"NO","co":"","po":"HELLÍN","pr":"ALBACETE"},{"c":"61012","n":"CIEZA","la":38.246609,"lo":-1.421702,"ce":"NO","fe":"NO","co":"","po":"CIEZA","pr":"MURCIA"},{"c":"61015","n":"ARCHENA-FORTUNA","la":38.13132,"lo":-1.236037,"ce":"NO","fe":"NO","co":"","po":"MOLINA DE SEGURA","pr":"MURCIA"},{"c":"61200","n":"MURCIA DEL CARMEN","la":37.9748243,"lo":-1.131508,"ce":"SI","fe":"NO","co":"","po":"MURCIA","pr":"MURCIA"},{"c":"61303","n":"BALSICAS-MAR MENOR","la":37.81884,"lo":-0.950891,"ce":"SI","fe":"NO","co":"","po":"TORRE-PACHECO","pr":"MURCIA"},{"c":"61304","n":"TORRE-PACHECO","la":37.746905,"lo":-0.967078,"ce":"SI","fe":"NO","co":"","po":"TORRE-PACHECO","pr":"MURCIA"},{"c":"61307","n":"CARTAGENA","la":37.604967,"lo":-0.975122,"ce":"NO","fe":"NO","co":"","po":"CARTAGENA","pr":"MURCIA"},{"c":"62001","n":"BENIEL","la":38.0448608,"lo":-0.9994759,"ce":"SI","fe":"NO","co":"","po":"BENIEL","pr":"MURCIA"},{"c":"62002","n":"ORIHUELA-MIGUEL HERNÁNDEZ","la":38.0779321,"lo":-0.944606,"ce":"SI","fe":"NO","co":"","po":"ORIHUELA","pr":"ALICANTE/ALACANT"},{"c":"62003","n":"CALLOSA DE SEGURA","la":38.1227686,"lo":-0.8745747,"ce":"SI","fe":"NO","co":"","po":"CALLOSA DE SEGURA","pr":"ALICANTE/ALACANT"},{"c":"62100","n":"SAN ISIDRO-ALBATERA-CATRAL","la":38.1670209,"lo":-0.8380854,"ce":"SI","fe":"NO","co":"","po":"SAN ISIDRO","pr":"ALICANTE/ALACANT"},{"c":"62101","n":"CREVILLENTE","la":38.2245622,"lo":-0.7815283,"ce":"SI","fe":"NO","co":"","po":"CREVILLENT","pr":"ALICANTE/ALACANT"},{"c":"62102","n":"ELCHE/ELX-CARRÚS","la":38.2689783,"lo":-0.7063992,"ce":"SI","fe":"NO","co":"","po":"ELCHE/ELX","pr":"ALICANTE/ALACANT"},{"c":"62103","n":"ELCHE/ELX-PARC","la":38.2717809,"lo":-0.6952193,"ce":"SI","fe":"NO","co":"","po":"ELCHE/ELX","pr":"ALICANTE/ALACANT"},{"c":"62104","n":"TORRELLANO","la":38.2896365,"lo":-0.5824572,"ce":"SI","fe":"NO","co":"","po":"ELCHE/ELX","pr":"ALICANTE/ALACANT"},{"c":"62109","n":"SANT GABRIEL","la":38.3290647,"lo":-0.5086866,"ce":"SI","fe":"NO","co":"","po":"ALICANTE/ALACANT","pr":"ALICANTE/ALACANT"},{"c":"64007","n":"LENOVA-MANUEL","la":39.0500727,"lo":-0.4776036,"ce":"SI","fe":"NO","co":"","po":"MANUEL","pr":"VALENCIA/VALÈNCIA"},{"c":"64100","n":"XÀTIVA","la":38.992148,"lo":-0.5245402,"ce":"SI","fe":"NO","co":"","po":"XÀTIVA","pr":"VALENCIA/VALÈNCIA"},{"c":"64102","n":"LA POBLA LLARGA","la":39.0833385,"lo":-0.4696592,"ce":"SI","fe":"NO","co":"","po":"POBLA LLARGA (LA)","pr":"VALENCIA/VALÈNCIA"},{"c":"64103","n":"CARCAIXENT","la":39.1205251,"lo":-0.4544102,"ce":"SI","fe":"NO","co":"","po":"CARCAIXENT","pr":"VALENCIA/VALÈNCIA"},{"c":"64104","n":"ALZIRA","la":39.1531495,"lo":-0.4506011,"ce":"SI","fe":"NO","co":"","po":"ALZIRA","pr":"VALENCIA/VALÈNCIA"},{"c":"64105","n":"ALGEMESÍ","la":39.1931484,"lo":-0.4409196,"ce":"SI","fe":"NO","co":"","po":"ALGEMESÍ","pr":"VALENCIA/VALÈNCIA"},{"c":"64107","n":"BENIFAIÓ","la":39.2843027,"lo":-0.4299537,"ce":"SI","fe":"NO","co":"","po":"BENIFAIÓ","pr":"VALENCIA/VALÈNCIA"},{"c":"64200","n":"SILLA","la":39.3619548,"lo":-0.4149813,"ce":"SI","fe":"NO","co":"","po":"SILLA","pr":"VALENCIA/VALÈNCIA"},{"c":"64201","n":"CATARROJA","la":39.4000447,"lo":-0.3992195,"ce":"SI","fe":"NO","co":"","po":"CATARROJA","pr":"VALENCIA/VALÈNCIA"},{"c":"64202","n":"MASSANASSA","la":39.4091934,"lo":-0.3953073,"ce":"SI","fe":"NO","co":"","po":"MASSANASSA","pr":"VALENCIA/VALÈNCIA"},{"c":"64203","n":"ALFAFAR-BENETÚSSER","la":39.4224232,"lo":-0.392605,"ce":"SI","fe":"NO","co":"","po":"ALFAFAR","pr":"VALENCIA/VALÈNCIA"},{"c":"65000","n":"VALÈNCIA-ESTACIÓ DEL NORD","la":39.4669305,"lo":-0.3772239,"ce":"SI","fe":"NO","co":"VALEN","po":"VALENCIA","pr":"VALENCIA/VALÈNCIA"},{"c":"65001","n":"ROCA-CÚPER","la":39.5262094,"lo":-0.3238405,"ce":"SI","fe":"NO","co":"","po":"MELIANA","pr":"VALENCIA/VALÈNCIA"},{"c":"65002","n":"VALÈNCIA-LA FONT DE SANT LLUÍS","la":39.4416052,"lo":-0.371422,"ce":"SI","fe":"NO","co":"","po":"VALENCIA","pr":"VALENCIA/VALÈNCIA"},{"c":"65003","n":"VALÈNCIA-CABANYAL","la":39.4702456,"lo":-0.3346772,"ce":"SI","fe":"NO","co":"","po":"VALENCIA","pr":"VALENCIA/VALÈNCIA"},{"c":"65005","n":"ALBUIXECH","la":39.5435233,"lo":-0.3205526,"ce":"SI","fe":"NO","co":"","po":"ALBUIXECH","pr":"VALENCIA/VALÈNCIA"},{"c":"65006","n":"MASSALFASSAR","la":39.5557532,"lo":-0.3183058,"ce":"SI","fe":"NO","co":"","po":"MASSALFASSAR","pr":"VALENCIA/VALÈNCIA"},{"c":"65007","n":"EL PUIG","la":39.588302,"lo":-0.3116645,"ce":"SI","fe":"NO","co":"","po":"PUIG DE SANTA MARIA (EL)","pr":"VALENCIA/VALÈNCIA"},{"c":"65008","n":"PUÇOL","la":39.6205367,"lo":-0.3031085,"ce":"SI","fe":"NO","co":"","po":"PUÇOL","pr":"VALENCIA/VALÈNCIA"},{"c":"65200","n":"SAGUNT","la":39.6758025,"lo":-0.271542,"ce":"SI","fe":"NO","co":"","po":"SAGUNTO/SAGUNT","pr":"VALENCIA/VALÈNCIA"},{"c":"65201","n":"LES VALLS","la":39.7193457,"lo":-0.2397602,"ce":"SI","fe":"NO","co":"","po":"SAGUNTO/SAGUNT","pr":"VALENCIA/VALÈNCIA"},{"c":"65202","n":"ALMENARA","la":39.7487737,"lo":-0.2183811,"ce":"SI","fe":"NO","co":"","po":"ALMENARA","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65203","n":"LA LLOSA","la":39.7678109,"lo":-0.2029444,"ce":"SI","fe":"NO","co":"","po":"LLOSA (LA)","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65204","n":"CHILCHES/XILXES","la":39.7826726,"lo":-0.1903295,"ce":"SI","fe":"NO","co":"","po":"CHILCHES/XILXES","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65205","n":"MONCOFA","la":39.8208891,"lo":-0.1626965,"ce":"SI","fe":"NO","co":"","po":"NULES","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65206","n":"NULES LA VILLAVELLA","la":39.8532354,"lo":-0.1527317,"ce":"SI","fe":"NO","co":"","po":"NULES","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65207","n":"BURRIANA-ALQUERÍAS NIÑO PERDIDO","la":39.8965088,"lo":-0.1038601,"ce":"SI","fe":"NO","co":"","po":"BORRIANA/BURRIANA","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65208","n":"VILA-REAL","la":39.9330935,"lo":-0.0967681,"ce":"SI","fe":"NO","co":"","po":"VILA-REAL","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65209","n":"ALMASSORA","la":39.9549079,"lo":-0.0767713,"ce":"SI","fe":"NO","co":"","po":"ALMAZORA/ALMASSORA","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65300","n":"CASTELLÓ DE LA PLANA","la":39.9884736,"lo":-0.0523456,"ce":"SI","fe":"NO","co":"","po":"CASTELLÓN DE LA PLANA/CASTELLÓ DE LA PLANA","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65304","n":"ORPESA","la":40.092258,"lo":0.139861,"ce":"SI","fe":"NO","co":"","po":"OROPESA DEL MAR/ORPESA","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65306","n":"TORREBLANCA","la":40.212211,"lo":0.198779,"ce":"SI","fe":"NO","co":"","po":"TORREBLANCA","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65308","n":"ALCALÁ DE CHIVERT","la":40.30469,"lo":0.228717,"ce":"SI","fe":"NO","co":"","po":"ALCALÀ DE XIVERT","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65311","n":"BENICARLÓ-PEÑÍSCOLA","la":40.427639,"lo":0.415217,"ce":"SI","fe":"NO","co":"","po":"BENICARLÓ","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65312","n":"VINARÒS","la":40.471682,"lo":0.455727,"ce":"SI","fe":"NO","co":"","po":"VINARÒS","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65314","n":"ULLDECONA-ALCANAR-LA SÉNIA","la":40.5959267,"lo":0.44927448,"ce":"SI","fe":"NO","co":"","po":"ULLDECONA","pr":"TARRAGONA"},{"c":"65318","n":"BENICÀSSIM","la":40.0579451,"lo":0.0577646,"ce":"SI","fe":"NO","co":"","po":"BENICASIM/BENICÀSSIM","pr":"CASTELLÓN/CASTELLÓ"},{"c":"65400","n":"TORTOSA","la":40.807333,"lo":0.5230136,"ce":"SI","fe":"NO","co":"","po":"TORTOSA","pr":"TARRAGONA"},{"c":"65401","n":"CAMP-REDÓ","la":40.7591556,"lo":0.55584433,"ce":"SI","fe":"NO","co":"","po":"TORTOSA","pr":"TARRAGONA"},{"c":"65402","n":"L'ALDEA-AMPOSTA-TORTOSA","la":40.753564,"lo":0.61430923,"ce":"SI","fe":"NO","co":"","po":"ALDEA (L')","pr":"TARRAGONA"},{"c":"65403","n":"CAMARLES-DELTEBRE","la":40.7747633,"lo":0.67176095,"ce":"SI","fe":"NO","co":"","po":"CAMARLES","pr":"TARRAGONA"},{"c":"65404","n":"L'AMPOLLA-EL PERELLÓ-DELTEBRE","la":40.8119898,"lo":0.70826336,"ce":"SI","fe":"NO","co":"","po":"AMPOLLA (L')","pr":"TARRAGONA"},{"c":"65405","n":"L'AMETLLA DE MAR","la":40.8862,"lo":0.80045321,"ce":"SI","fe":"NO","co":"","po":"AMETLLA DE MAR (L')","pr":"TARRAGONA"},{"c":"65411","n":"SALOU-PORT AVENTURA","la":41.0884798,"lo":1.14605195,"ce":"SI","fe":"NO","co":"","po":"SALOU","pr":"TARRAGONA"},{"c":"65420","n":"L'HOSPITALET DE L'INFANT","la":40.99939,"lo":0.91253887,"ce":"SI","fe":"NO","co":"","po":"VANDELLÒS I L'HOSPITALET DE L'INFANT","pr":"TARRAGONA"},{"c":"65422","n":"CAMBRILS","la":41.0815642,"lo":1.04603752,"ce":"SI","fe":"NO","co":"","po":"CAMBRILS","pr":"TARRAGONA"},{"c":"67004","n":"MARÍA DE HUERVA","la":41.539759,"lo":-0.998082,"ce":"NO","fe":"NO","co":"","po":"MARÍA DE HUERVA","pr":"ZARAGOZA"},{"c":"67007","n":"ARAÑALES DE MUEL","la":41.468946,"lo":-1.086394,"ce":"NO","fe":"NO","co":"","po":"MUEL","pr":"ZARAGOZA"},{"c":"67009","n":"LONGARES","la":41.404787,"lo":-1.158791,"ce":"NO","fe":"NO","co":"","po":"LONGARES","pr":"ZARAGOZA"},{"c":"67010","n":"CARIÑENA","la":41.335586,"lo":-1.228422,"ce":"NO","fe":"NO","co":"","po":"CARIÑENA","pr":"ZARAGOZA"},{"c":"67011","n":"ENCINACORBA","la":41.28865,"lo":-1.278534,"ce":"NO","fe":"NO","co":"","po":"ENCINACORBA","pr":"ZARAGOZA"},{"c":"67013","n":"VILLARREAL DE HUERVA","la":41.196498,"lo":-1.287096,"ce":"NO","fe":"NO","co":"","po":"VILLARREAL DE HUERVA","pr":"ZARAGOZA"},{"c":"67014","n":"VILLADOZ","la":41.165482,"lo":-1.279339,"ce":"NO","fe":"NO","co":"","po":"VILLADOZ","pr":"ZARAGOZA"},{"c":"67015","n":"BADULES","la":41.13951,"lo":-1.251572,"ce":"NO","fe":"NO","co":"","po":"BADULES","pr":"ZARAGOZA"},{"c":"67016","n":"VILLAHERMOSA","la":41.108492,"lo":-1.239803,"ce":"NO","fe":"NO","co":"","po":"VILLAHERMOSA DEL CAMPO","pr":"TERUEL"},{"c":"67017","n":"FERRERUELA","la":41.06387,"lo":-1.239384,"ce":"NO","fe":"NO","co":"","po":"FERRERUELA DE HUERVA","pr":"TERUEL"},{"c":"67018","n":"CUENCABUENA","la":41.009293,"lo":-1.254641,"ce":"NO","fe":"NO","co":"","po":"CALAMOCHA","pr":"TERUEL"},{"c":"67019","n":"LECHAGO","la":40.957681,"lo":-1.269087,"ce":"NO","fe":"NO","co":"","po":"CALAMOCHA","pr":"TERUEL"},{"c":"67020","n":"NAVARRETE","la":40.936721,"lo":-1.261733,"ce":"NO","fe":"NO","co":"","po":"CALAMOCHA","pr":"TERUEL"},{"c":"67021","n":"CALAMOCHA","la":40.903864,"lo":-1.299841,"ce":"NO","fe":"NO","co":"","po":"CALAMOCHA","pr":"TERUEL"},{"c":"67100","n":"CAMINREAL-FUENTES CLARAS","la":40.85111,"lo":-1.33765,"ce":"NO","fe":"NO","co":"","po":"CAMINREAL","pr":"TERUEL"},{"c":"67101","n":"TORRIJO DEL CAMPO","la":40.826012,"lo":-1.340498,"ce":"NO","fe":"NO","co":"","po":"TORRIJO DEL CAMPO","pr":"TERUEL"},{"c":"67103","n":"VILLAFRANCA DEL CAMPO","la":40.683827,"lo":-1.357927,"ce":"NO","fe":"NO","co":"","po":"VILLAFRANCA DEL CAMPO","pr":"TERUEL"},{"c":"67105","n":"SANTA EULALIA DEL CAMPO","la":40.572917,"lo":-1.312995,"ce":"NO","fe":"NO","co":"","po":"SANTA EULALIA","pr":"TERUEL"},{"c":"67107","n":"CELLA","la":40.455266,"lo":-1.244329,"ce":"NO","fe":"NO","co":"","po":"CELLA","pr":"TERUEL"},{"c":"67113","n":"MONREAL DEL CAMPO","la":40.782321,"lo":-1.360792,"ce":"NO","fe":"NO","co":"","po":"MONREAL DEL CAMPO","pr":"TERUEL"},{"c":"67200","n":"TERUEL","la":40.341029,"lo":-1.110284,"ce":"NO","fe":"NO","co":"","po":"TERUEL","pr":"TERUEL"},{"c":"67203","n":"PUEBLA DE VALVERDE","la":40.213424,"lo":-0.944674,"ce":"NO","fe":"NO","co":"","po":"PUEBLA DE VALVERDE (LA)","pr":"TERUEL"},{"c":"67205","n":"SARRIÓN","la":40.146339,"lo":-0.823631,"ce":"NO","fe":"NO","co":"","po":"SARRIÓN","pr":"TERUEL"},{"c":"67206","n":"MORA DE RUBIELOS","la":40.123142,"lo":-0.786145,"ce":"NO","fe":"NO","co":"","po":"ALBENTOSA","pr":"TERUEL"},{"c":"67207","n":"RUBIELOS DE MORA","la":40.118006,"lo":-0.773463,"ce":"NO","fe":"NO","co":"","po":"RUBIELOS DE MORA","pr":"TERUEL"},{"c":"67208","n":"BARRACAS","la":40.01174,"lo":-0.696151,"ce":"NO","fe":"NO","co":"","po":"BARRACAS","pr":"CASTELLÓN/CASTELLÓ"},{"c":"67215","n":"SEGORBE-CIUDAD","la":39.8471755,"lo":-0.4823544,"ce":"SI","fe":"NO","co":"","po":"SEGORBE","pr":"CASTELLÓN/CASTELLÓ"},{"c":"69001","n":"GENOVÉS","la":38.98773,"lo":-0.47988,"ce":"NO","fe":"NO","co":"","po":"GENOVÉS","pr":"VALENCIA/VALÈNCIA"},{"c":"69002","n":"BENIGÀNIM","la":38.938499,"lo":-0.453424,"ce":"NO","fe":"NO","co":"","po":"BENIGÀNIM","pr":"VALENCIA/VALÈNCIA"},{"c":"69003","n":"LA POBLA DEL DUC","la":38.907606,"lo":-0.453386,"ce":"NO","fe":"NO","co":"","po":"POBLA DEL DUC (LA)","pr":"VALENCIA/VALÈNCIA"},{"c":"69004","n":"MONTABERNER","la":38.884135,"lo":-0.491619,"ce":"NO","fe":"NO","co":"","po":"MONTAVERNER","pr":"VALENCIA/VALÈNCIA"},{"c":"69005","n":"BUFALÍ","la":38.867405,"lo":-0.510478,"ce":"NO","fe":"NO","co":"","po":"BUFALI","pr":"VALENCIA/VALÈNCIA"},{"c":"69006","n":"ALBAIDA","la":38.845645,"lo":-0.518129,"ce":"NO","fe":"NO","co":"","po":"ALBAIDA","pr":"VALENCIA/VALÈNCIA"},{"c":"69007","n":"AGULLENT","la":38.830569,"lo":-0.551183,"ce":"NO","fe":"NO","co":"","po":"AGULLENT","pr":"VALENCIA/VALÈNCIA"},{"c":"69008","n":"ONTINYENT","la":38.809692,"lo":-0.602457,"ce":"NO","fe":"NO","co":"","po":"ONTINYENT","pr":"VALENCIA/VALÈNCIA"},{"c":"69009","n":"AGRES","la":38.796829,"lo":-0.521744,"ce":"NO","fe":"NO","co":"","po":"AGRES","pr":"ALICANTE/ALACANT"},{"c":"69010","n":"COCENTAINA","la":38.740618,"lo":-0.446789,"ce":"NO","fe":"NO","co":"","po":"COCENTAINA","pr":"ALICANTE/ALACANT"},{"c":"69011","n":"ALCOI","la":38.709349,"lo":-0.470247,"ce":"NO","fe":"NO","co":"","po":"ALCOY/ALCOI","pr":"ALICANTE/ALACANT"},{"c":"70002","n":"ASAMBLEA DE MADRID-ENTREVÍAS","la":40.3818618,"lo":-3.6680454,"ce":"SI","fe":"NO","co":"","po":"MADRID","pr":"MADRID"},{"c":"70003","n":"EL POZO","la":40.3760377,"lo":-3.6561407,"ce":"SI","fe":"NO","co":"","po":"MADRID","pr":"MADRID"},{"c":"70005","n":"VALLECAS","la":40.382364,"lo":-3.623042,"ce":"SI","fe":"NO","co":"","po":"MADRID","pr":"MADRID"},{"c":"70100","n":"VICÁLVARO","la":40.4012524,"lo":-3.595897,"ce":"SI","fe":"NO","co":"","po":"MADRID","pr":"MADRID"},{"c":"70101","n":"SAN FERNANDO DE HENARES","la":40.4427805,"lo":-3.5339866,"ce":"SI","fe":"NO","co":"","po":"COSLADA","pr":"MADRID"},{"c":"70102","n":"TORREJÓN DE ARDOZ","la":40.4547895,"lo":-3.47973,"ce":"SI","fe":"NO","co":"","po":"TORREJÓN DE ARDOZ","pr":"MADRID"},{"c":"70103","n":"ALCALÁ DE HENARES","la":40.4890814,"lo":-3.3662457,"ce":"SI","fe":"NO","co":"","po":"ALCALÁ DE HENARES","pr":"MADRID"},{"c":"70104","n":"MECO","la":40.5346731,"lo":-3.2986806,"ce":"SI","fe":"NO","co":"","po":"MECO","pr":"MADRID"},{"c":"70105","n":"AZUQUECA","la":40.561077,"lo":-3.265397,"ce":"SI","fe":"NO","co":"","po":"AZUQUECA DE HENARES","pr":"GUADALAJARA"},{"c":"70107","n":"ALCALÁ DE HENARES-UNIVERSIDAD","la":40.5054303,"lo":-3.3353258,"ce":"SI","fe":"NO","co":"","po":"ALCALÁ DE HENARES","pr":"MADRID"},{"c":"70108","n":"COSLADA","la":40.423237,"lo":-3.5611109,"ce":"SI","fe":"NO","co":"","po":"COSLADA","pr":"MADRID"},{"c":"70109","n":"SANTA EUGENIA","la":40.3869545,"lo":-3.6089855,"ce":"SI","fe":"NO","co":"","po":"MADRID","pr":"MADRID"},{"c":"70111","n":"LA GARENA","la":40.4805448,"lo":-3.3930055,"ce":"SI","fe":"NO","co":"","po":"ALCALÁ DE HENARES","pr":"MADRID"},{"c":"70112","n":"SOTO DEL HENARES","la":40.463964,"lo":-3.4414076,"ce":"SI","fe":"NO","co":"","po":"YUNQUERA DE HENARES","pr":"MADRID"},{"c":"70200","n":"GUADALAJARA","la":40.6441928,"lo":-3.1822602,"ce":"SI","fe":"NO","co":"GUADA","po":"GUADALAJARA","pr":"GUADALAJARA"},{"c":"70202","n":"YUNQUERA DE HENARES","la":40.747013,"lo":-3.163226,"ce":"NO","fe":"NO","co":"","po":"YUNQUERA DE HENARES","pr":"GUADALAJARA"},{"c":"70204","n":"HUMANES DE MOHERNANDO","la":40.831273,"lo":-3.13886,"ce":"NO","fe":"NO","co":"","po":"HUMANES","pr":"GUADALAJARA"},{"c":"70207","n":"ESPINOSA DE HENARES","la":40.909686,"lo":-3.073157,"ce":"NO","fe":"NO","co":"","po":"COPERNAL","pr":"GUADALAJARA"},{"c":"70208","n":"CARRASCOSA DE HENARES","la":40.90598,"lo":-3.014352,"ce":"NO","fe":"NO","co":"","po":"ESPINOSA DE HENARES","pr":"GUADALAJARA"},{"c":"70209","n":"JADRAQUE","la":40.930229,"lo":-2.935935,"ce":"NO","fe":"NO","co":"","po":"JADRAQUE","pr":"GUADALAJARA"},{"c":"70210","n":"MATILLAS","la":40.953808,"lo":-2.84326,"ce":"NO","fe":"NO","co":"","po":"MATILLAS","pr":"GUADALAJARA"},{"c":"70300","n":"BAIDES","la":41.004864,"lo":-2.785635,"ce":"NO","fe":"NO","co":"","po":"BAIDES","pr":"GUADALAJARA"},{"c":"70302","n":"SIGÜENZA","la":41.071417,"lo":-2.646407,"ce":"NO","fe":"NO","co":"","po":"SIGÜENZA","pr":"GUADALAJARA"},{"c":"70400","n":"TORRALBA","la":41.136617,"lo":-2.492952,"ce":"NO","fe":"NO","co":"","po":"MEDINACELI","pr":"SORIA"},{"c":"70401","n":"MEDINACELI","la":41.165207,"lo":-2.421241,"ce":"NO","fe":"NO","co":"","po":"MEDINACELI","pr":"SORIA"},{"c":"70403","n":"ARCOS DE JALÓN","la":41.215854,"lo":-2.278998,"ce":"NO","fe":"NO","co":"","po":"ARCOS DE JALÓN","pr":"SORIA"},{"c":"70404","n":"SANTA MARÍA DE HUERTA","la":41.264421,"lo":-2.177525,"ce":"NO","fe":"NO","co":"","po":"SANTA MARÍA DE HUERTA","pr":"SORIA"},{"c":"70405","n":"MONREAL DE ARIZA","la":41.298767,"lo":-2.110448,"ce":"NO","fe":"NO","co":"","po":"MONREAL DE ARIZA","pr":"ZARAGOZA"},{"c":"70500","n":"ARIZA","la":41.3098,"lo":-2.059411,"ce":"NO","fe":"NO","co":"","po":"ARIZA","pr":"ZARAGOZA"},{"c":"70501","n":"CETINA","la":41.295978,"lo":-1.961811,"ce":"NO","fe":"NO","co":"","po":"CETINA","pr":"ZARAGOZA"},{"c":"70502","n":"ALHAMA DE ARAGÓN","la":41.294398,"lo":-1.904454,"ce":"NO","fe":"NO","co":"","po":"ALHAMA DE ARAGÓN","pr":"ZARAGOZA"},{"c":"70503","n":"BUBIERCA","la":41.31719,"lo":-1.855198,"ce":"NO","fe":"NO","co":"","po":"BUBIERCA","pr":"ZARAGOZA"},{"c":"70504","n":"ATECA","la":41.324659,"lo":-1.785268,"ce":"NO","fe":"NO","co":"","po":"ATECA","pr":"ZARAGOZA"},{"c":"70505","n":"TERRER","la":41.322218,"lo":-1.709254,"ce":"NO","fe":"NO","co":"","po":"TERRER","pr":"ZARAGOZA"},{"c":"70600","n":"CALATAYUD","la":41.346692,"lo":-1.63868,"ce":"NO","fe":"NO","co":"","po":"CALATAYUD","pr":"ZARAGOZA"},{"c":"70602","n":"EMBID DE JALÓN","la":41.421676,"lo":-1.592127,"ce":"NO","fe":"NO","co":"","po":"CALATAYUD","pr":"ZARAGOZA"},{"c":"70603","n":"PARACUELLOS-SABIÑÁN","la":41.42931,"lo":-1.567483,"ce":"NO","fe":"NO","co":"","po":"PARACUELLOS DE LA RIBERA","pr":"ZARAGOZA"},{"c":"70604","n":"SABIÑÁN","la":41.443981,"lo":-1.571474,"ce":"NO","fe":"NO","co":"","po":"SABIÑÁN","pr":"ZARAGOZA"},{"c":"70605","n":"MORÉS","la":41.478667,"lo":-1.566238,"ce":"NO","fe":"NO","co":"","po":"MORÉS","pr":"ZARAGOZA"},{"c":"70606","n":"PURROY","la":41.477236,"lo":-1.540446,"ce":"NO","fe":"NO","co":"","po":"MORÉS","pr":"ZARAGOZA"},{"c":"70607","n":"MORATA DE JALÓN","la":41.475467,"lo":-1.479721,"ce":"NO","fe":"NO","co":"","po":"MORATA DE JALÓN","pr":"ZARAGOZA"},{"c":"70700","n":"RICLA-LA ALMUNIA","la":41.501394,"lo":-1.40345,"ce":"NO","fe":"NO","co":"","po":"RICLA","pr":"ZARAGOZA"},{"c":"70701","n":"CALATORAO","la":41.528692,"lo":-1.360545,"ce":"NO","fe":"NO","co":"","po":"CALATORAO","pr":"ZARAGOZA"},{"c":"70702","n":"SALILLAS DE JALÓN","la":41.56794,"lo":-1.325848,"ce":"NO","fe":"NO","co":"","po":"SALILLAS DE JALÓN","pr":"ZARAGOZA"},{"c":"70703","n":"ÉPILA","la":41.60933,"lo":-1.301043,"ce":"NO","fe":"NO","co":"","po":"ÉPILA","pr":"ZARAGOZA"},{"c":"70704","n":"RUEDA DE JALÓN-LUMPIAQUE","la":41.638892,"lo":-1.281667,"ce":"NO","fe":"NO","co":"","po":"RUEDA DE JALÓN","pr":"ZARAGOZA"},{"c":"70705","n":"PLASENCIA DE JALÓN","la":41.68935,"lo":-1.234237,"ce":"NO","fe":"NO","co":"","po":"PLASENCIA DE JALÓN","pr":"ZARAGOZA"},{"c":"70706","n":"GRISÉN","la":41.745261,"lo":-1.165924,"ce":"NO","fe":"NO","co":"","po":"GRISÉN","pr":"ZARAGOZA"},{"c":"70800","n":"CASETAS","la":41.7226479,"lo":-1.0201916,"ce":"SI","fe":"NO","co":"","po":"ZARAGOZA","pr":"ZARAGOZA"},{"c":"70801","n":"UTEBO","la":41.7108644,"lo":-0.9985828,"ce":"SI","fe":"NO","co":"","po":"UTEBO","pr":"ZARAGOZA"},{"c":"70806","n":"ZARAGOZA-PORTILLO","la":41.6527361,"lo":-0.8958759,"ce":"SI","fe":"NO","co":"ZARAG","po":"ZARAGOZA","pr":"ZARAGOZA"},{"c":"70807","n":"ZARAGOZA-GOYA","la":41.6438779,"lo":-0.8912574,"ce":"SI","fe":"NO","co":"ZARAG","po":"ZARAGOZA","pr":"ZARAGOZA"},{"c":"71100","n":"ZARAGOZA-MIRAFLORES","la":41.6334311,"lo":-0.8681653,"ce":"SI","fe":"NO","co":"ZARAG","po":"ZARAGOZA","pr":"ZARAGOZA"},{"c":"71103","n":"FUENTES DE EBRO","la":41.515065,"lo":-0.618625,"ce":"NO","fe":"NO","co":"","po":"FUENTES DE EBRO","pr":"ZARAGOZA"},{"c":"71105","n":"QUINTO","la":41.419528,"lo":-0.490673,"ce":"NO","fe":"NO","co":"","po":"QUINTO","pr":"ZARAGOZA"},{"c":"71108","n":"LA ZAIDA-SÁSTAGO","la":41.320542,"lo":-0.427115,"ce":"NO","fe":"NO","co":"","po":"ZAIDA (LA)","pr":"ZARAGOZA"},{"c":"71200","n":"LA PUEBLA DE HÍJAR","la":41.2244,"lo":-0.438595,"ce":"NO","fe":"NO","co":"","po":"PUEBLA DE HÍJAR (LA)","pr":"TERUEL"},{"c":"71201","n":"SAMPER","la":41.182183,"lo":-0.368761,"ce":"NO","fe":"NO","co":"","po":"SAMPER DE CALANDA","pr":"TERUEL"},{"c":"71204","n":"CASPE","la":41.239738,"lo":-0.042701,"ce":"NO","fe":"NO","co":"","po":"CASPE","pr":"ZARAGOZA"},{"c":"71205","n":"VAL DE PILAS","la":41.230056,"lo":0.070145,"ce":"NO","fe":"NO","co":"","po":"CASPE","pr":"ZARAGOZA"},{"c":"71206","n":"FABARA","la":41.234405,"lo":0.143284,"ce":"NO","fe":"NO","co":"","po":"FABARA","pr":"ZARAGOZA"},{"c":"71207","n":"NONASPE","la":41.213788,"lo":0.242472,"ce":"NO","fe":"NO","co":"","po":"NONASPE","pr":"ZARAGOZA"},{"c":"71208","n":"FAIÓ-LA POBLA DE MASSALUCA","la":41.2250555,"lo":0.35110259,"ce":"NO","fe":"NO","co":"","po":"POBLA DE MASSALUCA (LA)","pr":"TARRAGONA"},{"c":"71209","n":"RIBA-ROJA D'EBRE","la":41.2485594,"lo":0.48103178,"ce":"SI","fe":"NO","co":"","po":"RIBA-ROJA D'EBRE","pr":"TARRAGONA"},{"c":"71210","n":"FLIX","la":41.2293651,"lo":0.54010012,"ce":"SI","fe":"NO","co":"","po":"FLIX","pr":"TARRAGONA"},{"c":"71211","n":"ASCÓ","la":41.1823727,"lo":0.56902524,"ce":"SI","fe":"NO","co":"","po":"ASCÓ","pr":"TARRAGONA"},{"c":"71300","n":"MÓRA LA NOVA","la":41.1065823,"lo":0.65321819,"ce":"SI","fe":"NO","co":"","po":"MÓRA LA NOVA","pr":"TARRAGONA"},{"c":"71302","n":"CAPÇANES","la":41.1020902,"lo":0.78036099,"ce":"SI","fe":"NO","co":"","po":"CAPÇANES","pr":"TARRAGONA"},{"c":"71303","n":"MARÇÀ-FALSET","la":41.1309421,"lo":0.81041774,"ce":"SI","fe":"NO","co":"","po":"MARÇÀ","pr":"TARRAGONA"},{"c":"71304","n":"PRADELL","la":41.1333595,"lo":0.85865032,"ce":"SI","fe":"NO","co":"","po":"PRADELL DE LA TEIXETA","pr":"TARRAGONA"},{"c":"71305","n":"DUESAIGÜES-L'ARGENTERA","la":41.1436928,"lo":0.92087096,"ce":"SI","fe":"NO","co":"","po":"ARGENTERA (L')","pr":"TARRAGONA"},{"c":"71306","n":"RIUDECANYES-BOTARELL","la":41.1400577,"lo":0.97574775,"ce":"SI","fe":"NO","co":"","po":"RIUDECANYES","pr":"TARRAGONA"},{"c":"71307","n":"LES BORGES DEL CAMP","la":41.1665064,"lo":1.0221323,"ce":"SI","fe":"NO","co":"","po":"BORGES DEL CAMP (LES)","pr":"TARRAGONA"},{"c":"71400","n":"REUS","la":41.1605229,"lo":1.10008978,"ce":"SI","fe":"NO","co":"","po":"REUS","pr":"TARRAGONA"},{"c":"71401","n":"VILA-SECA","la":41.1128193,"lo":1.15037877,"ce":"SI","fe":"NO","co":"","po":"VILA-SECA","pr":"TARRAGONA"},{"c":"71500","n":"TARRAGONA","la":41.1115636,"lo":1.25322776,"ce":"SI","fe":"NO","co":"TARRA","po":"TARRAGONA","pr":"TARRAGONA"},{"c":"71502","n":"ALTAFULLA-TAMARIT","la":41.1366479,"lo":1.37341488,"ce":"SI","fe":"NO","co":"","po":"TARRAGONA","pr":"TARRAGONA"},{"c":"71503","n":"TORREDEMBARRA","la":41.1427923,"lo":1.40578377,"ce":"SI","fe":"NO","co":"","po":"TORREDEMBARRA","pr":"TARRAGONA"},{"c":"71600","n":"SANT VICENÇ DE CALDERS","la":41.1862102,"lo":1.52480358,"ce":"SI","fe":"NO","co":"","po":"VENDRELL (EL)","pr":"TARRAGONA"},{"c":"71700","n":"VILANOVA I LA GELTRÚ","la":41.2203207,"lo":1.73077249,"ce":"SI","fe":"NO","co":"","po":"VILANOVA I LA GELTRÚ","pr":"BARCELONA"},{"c":"71801","n":"BARCELONA-SANTS","la":41.3798632,"lo":2.14101688,"ce":"SI","fe":"NO","co":"BARCE","po":"BARCELONA","pr":"BARCELONA"},{"c":"71802","n":"BARCELONA-PASSEIG DE GRÀCIA","la":41.3920862,"lo":2.16533862,"ce":"SI","fe":"NO","co":"BARCE","po":"BARCELONA","pr":"BARCELONA"},{"c":"72101","n":"RODA DE MAR","la":41.1864204,"lo":1.45520767,"ce":"SI","fe":"NO","co":"","po":"RODA DE BARÀ","pr":"TARRAGONA"},{"c":"72305","n":"L'HOSPITALET DE LLOBREGAT","la":41.3642038,"lo":2.10091749,"ce":"SI","fe":"NO","co":"","po":"HOSPITALET DE LLOBREGAT (L')","pr":"BARCELONA"},{"c":"73001","n":"PUIGVERD DE LLEIDA-ARTESA","la":41.5537015,"lo":0.73342706,"ce":"SI","fe":"NO","co":"","po":"PUIGVERD DE LLEIDA","pr":"LLEIDA"},{"c":"73002","n":"JUNEDA","la":41.5439328,"lo":0.82554185,"ce":"SI","fe":"NO","co":"","po":"JUNEDA","pr":"LLEIDA"},{"c":"73003","n":"LES BORGES BLANQUES","la":41.5213973,"lo":0.87791022,"ce":"SI","fe":"NO","co":"","po":"BORGES BLANQUES (LES)","pr":"LLEIDA"},{"c":"73004","n":"LA FLORESTA","la":41.5042013,"lo":0.924432,"ce":"SI","fe":"NO","co":"","po":"FLORESTA (LA)","pr":"LLEIDA"},{"c":"73005","n":"VINAIXA","la":41.425141,"lo":0.9703737,"ce":"SI","fe":"NO","co":"","po":"VINAIXA","pr":"LLEIDA"},{"c":"73006","n":"VIMBODÍ I POBLET","la":41.4027277,"lo":1.04603327,"ce":"SI","fe":"NO","co":"","po":"VIMBODÍ I POBLET","pr":"TARRAGONA"},{"c":"73007","n":"L'ESPLUGA DE FRANCOLÍ","la":41.4006616,"lo":1.10336094,"ce":"SI","fe":"NO","co":"","po":"ESPLUGA DE FRANCOLÍ (L')","pr":"TARRAGONA"},{"c":"73008","n":"MONTBLANC","la":41.3766254,"lo":1.16554869,"ce":"SI","fe":"NO","co":"","po":"MONTBLANC","pr":"TARRAGONA"},{"c":"73009","n":"VILAVERD","la":41.3376633,"lo":1.17653235,"ce":"SI","fe":"NO","co":"","po":"VILAVERD","pr":"TARRAGONA"},{"c":"73010","n":"LA RIBA","la":41.3184926,"lo":1.1813126,"ce":"SI","fe":"NO","co":"","po":"RIBA (LA)","pr":"TARRAGONA"},{"c":"73100","n":"LA PLANA-PICAMOIXONS","la":41.3061987,"lo":1.19488293,"ce":"SI","fe":"NO","co":"","po":"VALLS","pr":"TARRAGONA"},{"c":"73101","n":"ALCOVER","la":41.2616066,"lo":1.17416002,"ce":"SI","fe":"NO","co":"","po":"ALCOVER","pr":"TARRAGONA"},{"c":"73102","n":"LA SELVA DEL CAMP","la":41.2111544,"lo":1.14396003,"ce":"SI","fe":"NO","co":"","po":"SELVA DEL CAMP (LA)","pr":"TARRAGONA"},{"c":"74200","n":"HUESCA","la":42.133594,"lo":-0.409745,"ce":"NO","fe":"NO","co":"","po":"HUESCA","pr":"HUESCA"},{"c":"74204","n":"AYERBE","la":42.27561,"lo":-0.682569,"ce":"NO","fe":"NO","co":"","po":"AYERBE","pr":"HUESCA"},{"c":"74206","n":"RIGLOS","la":42.344756,"lo":-0.731599,"ce":"NO","fe":"NO","co":"","po":"PEÑAS DE RIGLOS (LAS)","pr":"HUESCA"},{"c":"74207","n":"SANTA MARÍA Y LA PEÑA","la":42.38039,"lo":-0.695647,"ce":"NO","fe":"NO","co":"","po":"PEÑAS DE RIGLOS (LAS)","pr":"HUESCA"},{"c":"74208","n":"ANZÁNIGO","la":42.403289,"lo":-0.643344,"ce":"NO","fe":"NO","co":"","po":"JACA","pr":"HUESCA"},{"c":"74209","n":"CALDEARENAS-AQUILUÉ","la":42.397973,"lo":-0.499309,"ce":"NO","fe":"NO","co":"","po":"CALDEARENAS","pr":"HUESCA"},{"c":"74211","n":"SABIÑÁNIGO","la":42.520446,"lo":-0.373085,"ce":"NO","fe":"NO","co":"","po":"SABIÑÁNIGO","pr":"HUESCA"},{"c":"74213","n":"JACA","la":42.578303,"lo":-0.539231,"ce":"NO","fe":"NO","co":"","po":"JACA","pr":"HUESCA"},{"c":"74214","n":"CASTIELLO-PUEBLO","la":42.62811,"lo":-0.546291,"ce":"NO","fe":"NO","co":"","po":"CASTIELLO DE JACA","pr":"HUESCA"},{"c":"74216","n":"VILLANÚA","la":42.688745,"lo":-0.52346,"ce":"NO","fe":"NO","co":"","po":"VILLANÚA","pr":"HUESCA"},{"c":"74217","n":"CANFRANC","la":42.751471,"lo":-0.514641,"ce":"NO","fe":"NO","co":"","po":"CANFRANC","pr":"HUESCA"},{"c":"75101","n":"ALCOLETGE","la":41.654267,"lo":0.685707,"ce":"SI","fe":"NO","co":"","po":"ALCOLETGE","pr":"LLEIDA"},{"c":"75102","n":"VILANOVA DE LA BARCA","la":41.687381,"lo":0.727898,"ce":"SI","fe":"NO","co":"","po":"VILANOVA DE LA BARCA","pr":"LLEIDA"},{"c":"75103","n":"TÉRMENS","la":41.716525,"lo":0.763046,"ce":"SI","fe":"NO","co":"","po":"TÉRMENS","pr":"LLEIDA"},{"c":"75104","n":"VALLFOGONA DE BALAGUER","la":41.755751,"lo":0.805612,"ce":"SI","fe":"NO","co":"","po":"VALLFOGONA DE BALAGUER","pr":"LLEIDA"},{"c":"75105","n":"BALAGUER","la":41.789333,"lo":0.81475,"ce":"SI","fe":"NO","co":"","po":"BALAGUER","pr":"LLEIDA"},{"c":"75106","n":"GERB","la":41.823329,"lo":0.812023,"ce":"SI","fe":"NO","co":"","po":"OS DE BALAGUER","pr":"LLEIDA"},{"c":"75107","n":"SANT LLORENÇ DE MONTGAI","la":41.866409,"lo":0.832424,"ce":"SI","fe":"NO","co":"","po":"CAMARASA","pr":"LLEIDA"},{"c":"75108","n":"VILANOVA DE LA SAL","la":41.912066,"lo":0.830305,"ce":"SI","fe":"NO","co":"","po":"AVELLANES I SANTA LINYA (LES)","pr":"LLEIDA"},{"c":"75109","n":"SANTA LIÑA","la":41.931776,"lo":0.852433,"ce":"SI","fe":"NO","co":"","po":"AVELLANES I SANTA LINYA (LES)","pr":"LLEIDA"},{"c":"75110","n":"AGER","la":42.006739,"lo":0.851617,"ce":"SI","fe":"NO","co":"","po":"ÀGER","pr":"LLEIDA"},{"c":"75111","n":"CELLERS-LLIMIANA","la":42.058699,"lo":0.882868,"ce":"SI","fe":"NO","co":"","po":"CASTELL DE MUR","pr":"LLEIDA"},{"c":"75112","n":"GUARDIA DE TREMP","la":42.101419,"lo":0.888047,"ce":"SI","fe":"NO","co":"","po":"SANT ESTEVE DE LA SARGA","pr":"LLEIDA"},{"c":"75113","n":"PALAU-PUIGCERCOS","la":42.146955,"lo":0.892441,"ce":"SI","fe":"NO","co":"","po":"TREMP","pr":"LLEIDA"},{"c":"75114","n":"TREMP","la":42.167364,"lo":0.891137,"ce":"SI","fe":"NO","co":"","po":"TREMP","pr":"LLEIDA"},{"c":"75115","n":"SALAS DE PALLARS","la":42.206845,"lo":0.940447,"ce":"SI","fe":"NO","co":"","po":"SALÀS DE PALLARS","pr":"LLEIDA"},{"c":"75116","n":"LA POBLA DE SEGUR","la":42.239854,"lo":0.966107,"ce":"SI","fe":"NO","co":"","po":"POBLA DE SEGUR (LA)","pr":"LLEIDA"},{"c":"76001","n":"SALOMÓ","la":41.2234416,"lo":1.37662504,"ce":"SI","fe":"NO","co":"","po":"SALOMÓ","pr":"TARRAGONA"},{"c":"76002","n":"VILABELLA","la":41.2395473,"lo":1.31749155,"ce":"SI","fe":"NO","co":"","po":"VILABELLA","pr":"TARRAGONA"},{"c":"76003","n":"NULLES-BRÀFIM","la":41.2503192,"lo":1.29750259,"ce":"SI","fe":"NO","co":"","po":"NULLES","pr":"TARRAGONA"},{"c":"76004","n":"VALLS","la":41.2896079,"lo":1.25865179,"ce":"SI","fe":"NO","co":"","po":"VALLS","pr":"TARRAGONA"},{"c":"78005","n":"VILLANUEVA DE GÁLLEGO","la":41.76551,"lo":-0.822204,"ce":"NO","fe":"NO","co":"","po":"VILLANUEVA DE GÁLLEGO","pr":"ZARAGOZA"},{"c":"78200","n":"TARDIENTA","la":41.975716,"lo":-0.538223,"ce":"NO","fe":"NO","co":"","po":"TARDIENTA","pr":"HUESCA"},{"c":"78201","n":"GRAÑÉN","la":41.938033,"lo":-0.369329,"ce":"NO","fe":"NO","co":"","po":"GRAÑÉN","pr":"HUESCA"},{"c":"78203","n":"SARIÑENA","la":41.817529,"lo":-0.17076,"ce":"NO","fe":"NO","co":"","po":"SARIÑENA","pr":"HUESCA"},{"c":"78301","n":"MONZÓN-RÍO CINCA","la":41.913679,"lo":0.196939,"ce":"NO","fe":"NO","co":"","po":"MONZÓN","pr":"HUESCA"},{"c":"78302","n":"BINÉFAR","la":41.849768,"lo":0.291478,"ce":"NO","fe":"NO","co":"","po":"BINÉFAR","pr":"HUESCA"},{"c":"78400","n":"LLEIDA-PIRINEUS","la":41.62013,"lo":0.63365328,"ce":"SI","fe":"NO","co":"","po":"LLEIDA","pr":"LLEIDA"},{"c":"78402","n":"BELL-LLOC D'URGELL","la":41.631619,"lo":0.781547,"ce":"SI","fe":"NO","co":"","po":"BELL-LLOC D'URGELL","pr":"LLEIDA"},{"c":"78403","n":"MOLLERUSSA","la":41.631779,"lo":0.896775,"ce":"SI","fe":"NO","co":"","po":"MOLLERUSSA","pr":"LLEIDA"},{"c":"78404","n":"GOLMÉS","la":41.635929,"lo":0.930863,"ce":"SI","fe":"NO","co":"","po":"GOLMÉS","pr":"LLEIDA"},{"c":"78405","n":"CASTELLNOU DE SEANA","la":41.637464,"lo":0.967736,"ce":"SI","fe":"NO","co":"","po":"CASTELLNOU DE SEANA","pr":"LLEIDA"},{"c":"78406","n":"BELLPUIG","la":41.632545,"lo":1.012993,"ce":"SI","fe":"NO","co":"","po":"BELLPUIG","pr":"LLEIDA"},{"c":"78407","n":"ANGLESOLA","la":41.646448,"lo":1.079192,"ce":"SI","fe":"NO","co":"","po":"ANGLESOLA","pr":"LLEIDA"},{"c":"78408","n":"TÀRREGA","la":41.650387,"lo":1.138963,"ce":"SI","fe":"NO","co":"","po":"TÀRREGA","pr":"LLEIDA"},{"c":"78500","n":"CERVERA","la":41.673611,"lo":1.274773,"ce":"SI","fe":"NO","co":"","po":"CERVERA","pr":"LLEIDA"},{"c":"78501","n":"SANT GUIM DE FREIXENET","la":41.655924,"lo":1.42053,"ce":"SI","fe":"NO","co":"","po":"SANT GUIM DE FREIXENET","pr":"LLEIDA"},{"c":"78502","n":"SANT MARTÍ SESGUEIOLES","la":41.701217,"lo":1.486204,"ce":"SI","fe":"NO","co":"","po":"SANT MARTÍ SESGUEIOLES","pr":"BARCELONA"},{"c":"78503","n":"CALAF","la":41.730334,"lo":1.515097,"ce":"SI","fe":"NO","co":"","po":"CALAF","pr":"BARCELONA"},{"c":"78504","n":"SEGUERS-SANT PERE SALLAVINERA","la":41.747991,"lo":1.574167,"ce":"SI","fe":"NO","co":"","po":"SANT PERE SALLAVINERA","pr":"BARCELONA"},{"c":"78505","n":"AGUILAR DE SEGARRA","la":41.738917,"lo":1.62372,"ce":"SI","fe":"NO","co":"","po":"AGUILAR DE SEGARRA","pr":"BARCELONA"},{"c":"78506","n":"RAJADELL","la":41.733159,"lo":1.696275,"ce":"SI","fe":"NO","co":"","po":"RAJADELL","pr":"BARCELONA"},{"c":"78600","n":"MANRESA","la":41.7203921,"lo":1.82648564,"ce":"SI","fe":"NO","co":"","po":"MANRESA","pr":"BARCELONA"},{"c":"78604","n":"SANT VICENÇ DE CASTELLET","la":41.6688309,"lo":1.86264304,"ce":"SI","fe":"NO","co":"","po":"SANT VICENÇ DE CASTELLET","pr":"BARCELONA"},{"c":"78700","n":"TERRASSA ESTACIÓ DEL NORD","la":41.5697825,"lo":2.01435428,"ce":"SI","fe":"NO","co":"","po":"TERRASSA","pr":"BARCELONA"},{"c":"78804","n":"BARCELONA-ARC DE TRIOMF","la":41.3919048,"lo":2.18063916,"ce":"SI","fe":"NO","co":"","po":"BARCELONA","pr":"BARCELONA"},{"c":"78805","n":"BARCELONA-PLAÇA DE CATALUNYA","la":41.3879231,"lo":2.16970383,"ce":"SI","fe":"NO","co":"","po":"BARCELONA","pr":"BARCELONA"},{"c":"79004","n":"BARCELONA-SANT ANDREU","la":41.4361251,"lo":2.19319866,"ce":"SI","fe":"NO","co":"BARCE","po":"BARCELONA","pr":"BARCELONA"},{"c":"79009","n":"BARCELONA-EL CLOT","la":41.4092979,"lo":2.18719759,"ce":"SI","fe":"NO","co":"BARCE","po":"BARCELONA","pr":"BARCELONA"},{"c":"79100","n":"GRANOLLERS-CENTRE","la":41.5997447,"lo":2.29126962,"ce":"SI","fe":"NO","co":"","po":"GRANOLLERS","pr":"BARCELONA"},{"c":"79104","n":"SANT CELONI","la":41.6857928,"lo":2.49072799,"ce":"SI","fe":"NO","co":"","po":"SANT CELONI","pr":"BARCELONA"},{"c":"79105","n":"GUALBA","la":41.7181901,"lo":2.53878373,"ce":"SI","fe":"NO","co":"","po":"GUALBA","pr":"BARCELONA"},{"c":"79106","n":"RIELLS I VIABREA-BREDA","la":41.7263582,"lo":2.56889584,"ce":"SI","fe":"NO","co":"","po":"RIELLS I VIABREA","pr":"GIRONA"},{"c":"79107","n":"HOSTALRIC","la":41.747788,"lo":2.63165011,"ce":"SI","fe":"NO","co":"","po":"HOSTALRIC","pr":"GIRONA"},{"c":"79200","n":"MAÇANET-MASSANES","la":41.7724212,"lo":2.67385865,"ce":"SI","fe":"NO","co":"","po":"MASSANES","pr":"GIRONA"},{"c":"79202","n":"SILS","la":41.8075996,"lo":2.74500729,"ce":"SI","fe":"NO","co":"","po":"SILS","pr":"GIRONA"},{"c":"79203","n":"CALDES DE MALAVELLA","la":41.84111,"lo":2.80076692,"ce":"SI","fe":"NO","co":"","po":"CALDES DE MALAVELLA","pr":"GIRONA"},{"c":"79204","n":"RIUDELLOTS","la":41.896297,"lo":2.81157037,"ce":"SI","fe":"NO","co":"","po":"RIUDELLOTS DE LA SELVA","pr":"GIRONA"},{"c":"79205","n":"FORNELLS DE LA SELVA","la":41.935043,"lo":2.80978324,"ce":"SI","fe":"NO","co":"","po":"FORNELLS DE LA SELVA","pr":"GIRONA"},{"c":"79300","n":"GIRONA","la":41.9793629,"lo":2.81693689,"ce":"SI","fe":"NO","co":"","po":"GIRONA","pr":"GIRONA"},{"c":"79301","n":"CELRÀ","la":42.0271984,"lo":2.87490587,"ce":"SI","fe":"NO","co":"","po":"CELRÀ","pr":"GIRONA"},{"c":"79302","n":"BORDILS-JUIÀ","la":42.0370568,"lo":2.91529561,"ce":"SI","fe":"NO","co":"","po":"BORDILS","pr":"GIRONA"},{"c":"79303","n":"FLAÇÀ","la":42.047477,"lo":2.95740315,"ce":"SI","fe":"NO","co":"","po":"FLAÇÀ","pr":"GIRONA"},{"c":"79304","n":"SANT JORDI DESVALLS","la":42.0683023,"lo":2.96447664,"ce":"SI","fe":"NO","co":"","po":"SANT JORDI DESVALLS","pr":"GIRONA"},{"c":"79305","n":"CAMALLERA","la":42.1223297,"lo":2.96536522,"ce":"SI","fe":"NO","co":"","po":"SAUS, CAMALLERA I LLAMPAIES","pr":"GIRONA"},{"c":"79306","n":"SANT MIQUEL DE FLUVIÀ","la":42.1721019,"lo":2.98959828,"ce":"SI","fe":"NO","co":"","po":"SANT MIQUEL DE FLUVIÀ","pr":"GIRONA"},{"c":"79308","n":"VILAMALLA","la":42.216362,"lo":2.97776423,"ce":"SI","fe":"NO","co":"","po":"VILAMALLA","pr":"GIRONA"},{"c":"79309","n":"FIGUERES","la":42.2651134,"lo":2.96880074,"ce":"SI","fe":"NO","co":"","po":"FIGUERES","pr":"GIRONA"},{"c":"79311","n":"VILAJUÏGA","la":42.3256691,"lo":3.08754626,"ce":"SI","fe":"NO","co":"","po":"VILAJUÏGA","pr":"GIRONA"},{"c":"79312","n":"LLANÇÀ","la":42.3666194,"lo":3.1489746,"ce":"SI","fe":"NO","co":"","po":"LLANÇÀ","pr":"GIRONA"},{"c":"79314","n":"COLERA","la":42.4068837,"lo":3.15434316,"ce":"SI","fe":"NO","co":"","po":"COLERA","pr":"GIRONA"},{"c":"79315","n":"PORTBOU","la":42.4245908,"lo":3.15801841,"ce":"SI","fe":"NO","co":"PORTB","po":"PORTBOU","pr":"GIRONA"},{"c":"79316","n":"CERBÈRE","la":42.441664,"lo":3.16314935,"ce":"SI","fe":"NO","co":"PORTB","po":"PORTBOU","pr":"GIRONA"},{"c":"79400","n":"BARCELONA ESTACIÓ DE FRANÇA","la":41.3844866,"lo":2.18534785,"ce":"SI","fe":"NO","co":"BARCE","po":"BARCELONA","pr":"BARCELONA"},{"c":"79403","n":"SANT ADRIÀ DE BESÒS","la":41.4244316,"lo":2.23048178,"ce":"SI","fe":"NO","co":"","po":"SANT ADRIÀ DE BESÒS","pr":"BARCELONA"},{"c":"79404","n":"BADALONA","la":41.4458838,"lo":2.24892096,"ce":"SI","fe":"NO","co":"","po":"BADALONA","pr":"BARCELONA"},{"c":"79405","n":"MONTGAT","la":41.4630211,"lo":2.2721551,"ce":"SI","fe":"NO","co":"","po":"MONTGAT","pr":"BARCELONA"},{"c":"79406","n":"MONTGAT-NORD","la":41.468786,"lo":2.28669661,"ce":"SI","fe":"NO","co":"","po":"MONTGAT","pr":"BARCELONA"},{"c":"79407","n":"EL MASNOU","la":41.4770363,"lo":2.3103772,"ce":"SI","fe":"NO","co":"","po":"MASNOU (EL)","pr":"BARCELONA"},{"c":"79409","n":"PREMIÀ DE MAR","la":41.4877522,"lo":2.35485608,"ce":"SI","fe":"NO","co":"","po":"PREMIÀ DE MAR","pr":"BARCELONA"},{"c":"79410","n":"VILASSAR DE MAR","la":41.5006285,"lo":2.38986104,"ce":"SI","fe":"NO","co":"","po":"VILASSAR DE MAR","pr":"BARCELONA"},{"c":"79412","n":"CABRERA DE MAR-VILASSAR DE MAR","la":41.5067718,"lo":2.40162431,"ce":"SI","fe":"NO","co":"","po":"CABRERA DE MAR","pr":"BARCELONA"},{"c":"79500","n":"MATARÓ","la":41.5333852,"lo":2.44553025,"ce":"SI","fe":"NO","co":"","po":"MATARÓ","pr":"BARCELONA"},{"c":"79501","n":"SANT ANDREU DE LLAVANERES","la":41.5555467,"lo":2.49826463,"ce":"SI","fe":"NO","co":"","po":"SANT ANDREU DE LLAVANERES","pr":"BARCELONA"},{"c":"79502","n":"CALDES D'ESTRAC","la":41.5686082,"lo":2.52598143,"ce":"SI","fe":"NO","co":"","po":"CALDES D'ESTRAC","pr":"BARCELONA"},{"c":"79600","n":"ARENYS DE MAR","la":41.577699,"lo":2.54933744,"ce":"SI","fe":"NO","co":"","po":"ARENYS DE MAR","pr":"BARCELONA"},{"c":"79601","n":"CANET DE MAR","la":41.5866691,"lo":2.58128887,"ce":"SI","fe":"NO","co":"","po":"CANET DE MAR","pr":"BARCELONA"},{"c":"79602","n":"SANT POL DE MAR","la":41.6017549,"lo":2.62459756,"ce":"SI","fe":"NO","co":"","po":"SANT POL DE MAR","pr":"BARCELONA"},{"c":"79603","n":"CALELLA","la":41.6146911,"lo":2.66599517,"ce":"SI","fe":"NO","co":"","po":"CALELLA","pr":"BARCELONA"},{"c":"79604","n":"PINEDA DE MAR","la":41.6224449,"lo":2.69355042,"ce":"SI","fe":"NO","co":"","po":"PINEDA DE MAR","pr":"BARCELONA"},{"c":"79605","n":"MALGRAT DE MAR","la":41.641602,"lo":2.74127903,"ce":"SI","fe":"NO","co":"","po":"MALGRAT DE MAR","pr":"BARCELONA"},{"c":"79606","n":"BLANES","la":41.6736157,"lo":2.7692697,"ce":"SI","fe":"NO","co":"","po":"BLANES","pr":"GIRONA"},{"c":"79607","n":"TORDERA","la":41.7071687,"lo":2.71957063,"ce":"SI","fe":"NO","co":"","po":"TORDERA","pr":"BARCELONA"},{"c":"79608","n":"SANTA SUSANA","la":41.6300971,"lo":2.7159698,"ce":"SI","fe":"NO","co":"","po":"SANTA SUSANNA","pr":"BARCELONA"},{"c":"80001","n":"ALTSASU-PUEBLO","la":42.893283,"lo":-2.167429,"ce":"SI","fe":"NO","co":"","po":"ALTSASU/ALSASUA","pr":"NAVARRA"},{"c":"80003","n":"ETXARRI-ARANATZ","la":42.911138,"lo":-2.071245,"ce":"NO","fe":"NO","co":"","po":"ETXARRI-ARANATZ","pr":"NAVARRA"},{"c":"80005","n":"UHARTE-ARAKIL","la":42.920606,"lo":-1.974814,"ce":"NO","fe":"NO","co":"","po":"UHARTE-ARAKIL","pr":"NAVARRA"},{"c":"80100","n":"PAMPLONA/IRUÑA","la":42.824877,"lo":-1.661419,"ce":"NO","fe":"NO","co":"","po":"PAMPLONA/IRUÑA","pr":"NAVARRA"},{"c":"80108","n":"TAFALLA","la":42.525756,"lo":-1.671467,"ce":"NO","fe":"NO","co":"","po":"TAFALLA","pr":"NAVARRA"},{"c":"80109","n":"OLITE-ERRIBERRI","la":42.484989,"lo":-1.649964,"ce":"NO","fe":"NO","co":"","po":"OLITE/ERRIBERRI","pr":"NAVARRA"},{"c":"80114","n":"MARCILLA DE NAVARRA","la":42.334851,"lo":-1.717418,"ce":"NO","fe":"NO","co":"","po":"MARCILLA","pr":"NAVARRA"},{"c":"80115","n":"VILLAFRANCA DE NAVARRA","la":42.280734,"lo":-1.745716,"ce":"NO","fe":"NO","co":"","po":"VILLAFRANCA","pr":"NAVARRA"},{"c":"81002","n":"HARO","la":42.583635,"lo":-2.849396,"ce":"NO","fe":"NO","co":"","po":"HARO","pr":"RIOJA, LA"},{"c":"81100","n":"LOGROÑO","la":42.457459,"lo":-2.442193,"ce":"NO","fe":"NO","co":"","po":"LOGROÑO","pr":"RIOJA, LA"},{"c":"81102","n":"AGONCILLO","la":42.443585,"lo":-2.291701,"ce":"NO","fe":"NO","co":"","po":"AGONCILLO","pr":"RIOJA, LA"},{"c":"81105","n":"ALCANADRE","la":42.407437,"lo":-2.122094,"ce":"NO","fe":"NO","co":"","po":"ALCANADRE","pr":"RIOJA, LA"},{"c":"81106","n":"FÉCULAS-NAVARRA","la":42.411148,"lo":-2.098196,"ce":"NO","fe":"NO","co":"","po":"LODOSA","pr":"NAVARRA"},{"c":"81108","n":"CALAHORRA","la":42.310458,"lo":-1.957755,"ce":"NO","fe":"NO","co":"","po":"CALAHORRA","pr":"RIOJA, LA"},{"c":"81109","n":"RINCÓN DE SOTO","la":42.230011,"lo":-1.847473,"ce":"NO","fe":"NO","co":"","po":"RINCÓN DE SOTO","pr":"RIOJA, LA"},{"c":"81110","n":"ALFARO","la":42.186525,"lo":-1.747985,"ce":"NO","fe":"NO","co":"","po":"ALFARO","pr":"RIOJA, LA"},{"c":"81200","n":"CASTEJÓN DE EBRO","la":42.172719,"lo":-1.692114,"ce":"NO","fe":"NO","co":"","po":"CASTEJÓN","pr":"NAVARRA"},{"c":"81202","n":"TUDELA DE NAVARRA","la":42.059434,"lo":-1.597931,"ce":"NO","fe":"NO","co":"","po":"TUDELA","pr":"NAVARRA"},{"c":"81203","n":"RIBAFORADA","la":41.997038,"lo":-1.515097,"ce":"NO","fe":"NO","co":"","po":"RIBAFORADA","pr":"NAVARRA"},{"c":"81205","n":"CORTES DE NAVARRA","la":41.915076,"lo":-1.420439,"ce":"NO","fe":"NO","co":"","po":"CORTES","pr":"NAVARRA"},{"c":"81206","n":"GALLUR","la":41.867164,"lo":-1.321342,"ce":"NO","fe":"NO","co":"","po":"GALLUR","pr":"ZARAGOZA"},{"c":"81207","n":"LUCENI","la":41.826116,"lo":-1.243536,"ce":"NO","fe":"NO","co":"","po":"LUCENI","pr":"ZARAGOZA"},{"c":"81208","n":"PEDROLA","la":41.805198,"lo":-1.201673,"ce":"NO","fe":"NO","co":"","po":"PEDROLA","pr":"ZARAGOZA"},{"c":"81209","n":"CABAÑAS DE EBRO","la":41.788065,"lo":-1.167533,"ce":"NO","fe":"NO","co":"","po":"CABAÑAS DE EBRO","pr":"ZARAGOZA"},{"c":"81210","n":"ALAGÓN","la":41.771422,"lo":-1.112771,"ce":"NO","fe":"NO","co":"","po":"ALAGÓN","pr":"ZARAGOZA"},{"c":"82100","n":"SORIA","la":41.754754,"lo":-2.476537,"ce":"NO","fe":"NO","co":"","po":"SORIA","pr":"SORIA"},{"c":"84101","n":"ALMAZÁN-VILLA","la":41.489019,"lo":-2.525375,"ce":"NO","fe":"NO","co":"","po":"ALMAZÁN","pr":"SORIA"},{"c":"84103","n":"TARDELCUENDE","la":41.593525,"lo":-2.639337,"ce":"NO","fe":"NO","co":"","po":"TARDELCUENDE","pr":"SORIA"},{"c":"84104","n":"QUINTANA REDONDA","la":41.639726,"lo":-2.609682,"ce":"NO","fe":"NO","co":"","po":"QUINTANA REDONDA","pr":"SORIA"},{"c":"87067","n":"VALENCE VILLE","la":44.9278984,"lo":4.8930473,"ce":"NO","fe":"NO","co":"VALFR","po":"VALENCE","pr":"nan"},{"c":"87088","n":"NARBONNE","la":43.190253,"lo":3.005716,"ce":"NO","fe":"NO","co":"","po":"NARBONA","pr":"DESCONOCIDO"},{"c":"87089","n":"MARSEILLE ST CHARLES","la":43.30349,"lo":5.382236,"ce":"NO","fe":"NO","co":"","po":"MARSEILLE","pr":"nan"},{"c":"87173","n":"MONTPELLIER SAINT-ROCH","la":43.604852,"lo":3.880491,"ce":"NO","fe":"NO","co":"MONTP","po":"MONTPELLIER","pr":"DESCONOCIDO"},{"c":"87302","n":"NIMES","la":43.832291,"lo":4.365845,"ce":"NO","fe":"NO","co":"NIMES","po":"NIMES","pr":"nan"},{"c":"87303","n":"LYON PART DIEU","la":45.760281,"lo":4.859801,"ce":"NO","fe":"NO","co":"LYON-","po":"LYON","pr":"nan"},{"c":"87374","n":"PERPIGNAN","la":42.696421,"lo":2.880381,"ce":"NO","fe":"NO","co":"","po":"PERPIGNAN","pr":"nan"},{"c":"87810","n":"VALENCE TGV","la":44.991545,"lo":4.978703,"ce":"NO","fe":"NO","co":"VALFR","po":"VALENCE","pr":"nan"},{"c":"87814","n":"AVIGNON TGV","la":43.921938,"lo":4.785813,"ce":"NO","fe":"NO","co":"","po":"AVIGNON","pr":"nan"},{"c":"87912","n":"AIX EN PROVENCE TGV ","la":43.455268,"lo":5.31723,"ce":"NO","fe":"NO","co":"","po":"AIX EN PROVENCE","pr":"nan"},{"c":"92102","n":"TOLEDO","la":39.862272,"lo":-4.011244,"ce":"NO","fe":"NO","co":"","po":"TOLEDO","pr":"TOLEDO"},{"c":"94002","n":"DAIMIEL","la":39.061553,"lo":-3.604213,"ce":"NO","fe":"NO","co":"","po":"DAIMIEL","pr":"CIUDAD REAL"},{"c":"94004","n":"ALMAGRO","la":38.895323,"lo":-3.709777,"ce":"NO","fe":"NO","co":"","po":"ALMAGRO","pr":"CIUDAD REAL"},{"c":"94021","n":"NINE","la":41.45534,"lo":-8.54513,"ce":"NO","fe":"NO","co":"","po":"NINE","pr":"nan"},{"c":"94033","n":"VIANA DA CASTELO","la":41.69517,"lo":-8.83134,"ce":"NO","fe":"NO","co":"","po":"VIANA DA CASTELO","pr":"nan"},{"c":"94346","n":"PORTO CAMPANHA - O PORTO CAMPAÑA","la":41.1489,"lo":-8.58544,"ce":"NO","fe":"NO","co":"","po":"O PORTO CAMPAÑA","pr":"nan"},{"c":"96122","n":"BARCELOS","la":41.53673,"lo":-8.60907,"ce":"NO","fe":"NO","co":"","po":"BARCELOS","pr":"nan"},{"c":"97004","n":"PORTAVE.FERRARI","la":41.0847081,"lo":1.1492886,"ce":"SI","fe":"NO","co":"","po":"DESCONOCIDO","pr":"BARCELONA"},{"c":"97015","n":"PORTAVENTURA","la":41.0889239,"lo":1.1398316,"ce":"SI","fe":"NO","co":"","po":"SALOU","pr":"BARCELONA"},{"c":"97017","n":"SANT SADURNÍ D'ANOIA","la":41.419824,"lo":1.794186,"ce":"SI","fe":"NO","co":"","po":"SANT SADURNÍ D'ANOIA","pr":"BARCELONA"},{"c":"97018","n":"CARIBE PARK","la":41.0875559,"lo":1.1517695,"ce":"SI","fe":"NO","co":"","po":"SALOU","pr":"BARCELONA"},{"c":"97100","n":"PITIS","la":40.4954173,"lo":-3.7261603,"ce":"SI","fe":"NO","co":"","po":"MADRID","pr":"MADRID"},{"c":"97200","n":"MIRASIERRA-PACO DE LUCÍA","la":40.499759,"lo":-3.7092505,"ce":"SI","fe":"NO","co":"","po":"CANENCIA","pr":"MADRID"},{"c":"97201","n":"MADRID-RAMÓN Y CAJAL","la":40.4881473,"lo":-3.6948037,"ce":"SI","fe":"NO","co":"","po":"MADRID","pr":"MADRID"},{"c":"98000","n":"MADRID - ATOCHA CERCANÍAS","la":40.406528,"lo":-3.689373,"ce":"SI","fe":"NO","co":"MADRI","po":"MADRID","pr":"MADRID"},{"c":"98103","n":"ALCALÁ DE HENARES","la":40.489027,"lo":-3.365765,"ce":"SI","fe":"NO","co":"","po":"ALCALÁ DE HENARES","pr":"MADRID"},{"c":"99000","n":"MADRID CERCANÍAS","la":40.406528,"lo":-3.689373,"ce":"SI","fe":"NO","co":"MADRI","po":"MADRID","pr":"MADRID"},{"c":"99117","n":"OURENSE TURÍSTICO","la":42.350389,"lo":-7.872777,"ce":"SI","fe":"NO","co":"","po":"OURENSE","pr":"OURENSE"},{"c":"99143","n":"A CORUÑA-TURÍSTICO","la":43.352761,"lo":-8.409755,"ce":"NO","fe":"NO","co":"","po":"CORUÑA (A)","pr":"CORUÑA, A"},{"c":"99159","n":"SANTIAGO-TURÍSTICO","la":42.870842,"lo":-8.544697,"ce":"NO","fe":"NO","co":"","po":"SANTIAGO DE COMPOSTELA","pr":"CORUÑA, A"},{"c":"99161","n":"PONTEVEDRA-TURÍSTICO","la":42.421969,"lo":-8.635546,"ce":"NO","fe":"NO","co":"","po":"PONTEVEDRA","pr":"PONTEVEDRA"},{"c":"99173","n":"OVIEDO-TUR","la":43.366841,"lo":-5.854263,"ce":"SI","fe":"NO","co":"","po":"OVIEDO","pr":"ASTURIAS"},{"c":"99174","n":"FERROL-TUR","la":43.4880349,"lo":-8.231143,"ce":"NO","fe":"NO","co":"","po":"FERROL","pr":"CORUÑA, A"},{"c":"99180","n":"SORIA ENLACE AVE","la":41.754754,"lo":-2.476537,"ce":"NO","fe":"NO","co":"","po":"SORIA","pr":"SORIA"}];

// ─── STATE ─────────────────────────────────────────────
const state = {
  stops: {},
  stopTimes: {},
  trips: {},
  routes: {},
  realtimeDelays: {},
  vehicles: [],
  markers: {},
  stationMarkers: {},
  renfeStations: [],
  stopsByName: {},
  activeFilter: 'cercanias', // DEFAULT: cercanias selected
  selectedVehicle: null,
  loading: true,
};

// ─── THEME ─────────────────────────────────────────────
(function initTheme() {
  const saved = localStorage.getItem('tutren-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
})();

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  const meta = document.getElementById('meta-theme');
  if (meta) meta.content = theme === 'dark' ? '#121218' : '#f3eff7';
  // Update Leaflet tiles if map is initialized
  if (window.map && window._tileLayers) {
    const isDark = theme === 'dark';
    window._tileLayers.dark.setOpacity(isDark ? 1 : 0);
    window._tileLayers.light.setOpacity(isDark ? 0 : 1);
  }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('tutren-theme', next);
  updateThemeIcon(next);
});

// ─── CSV PARSER ────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const values = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { inQ = !inQ; }
      else if (c === ',' && !inQ) { values.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    values.push(cur.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (values[i] || '').replace(/^"|"$/g, ''); });
    return obj;
  });
}

// ─── FETCH HELPERS ─────────────────────────────────────
async function fetchJSON(url) {
  const r = await fetch(url, { cache: 'no-cache' });
  return r.json();
}
async function fetchCSV(url) {
  const r = await fetch(url, { cache: 'force-cache' });
  return parseCSV(await r.text());
}

// ─── TIME HELPERS ──────────────────────────────────────
function gtfsTimeToday(gtfsTime) {
  if (!gtfsTime) return null;
  const [h, m, s] = gtfsTime.split(':').map(Number);
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h % 24, m, s || 0);
  return d;
}
function formatTime(date) {
  if (!date) return '--:--';
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}
function formatDelay(seconds) {
  if (!seconds || Math.abs(seconds) < 30) return null;
  const mins = Math.round(seconds / 60);
  if (mins > 0) return `+${mins} min`;
  return `${mins} min`;
}

// ─── LOAD PROGRESS ─────────────────────────────────────
let loadProgress = 0;
function setProgress(p, msg) {
  loadProgress = p;
  document.getElementById('loading-fill').style.width = p + '%';
  if (msg) document.getElementById('loading-text').textContent = msg;
}

const URLS = {
  vehiclesCercanias: PROXY + 'https://gtfsrt.renfe.com/vehicle_positions.json',
  tripUpdatesCercanias: PROXY + 'https://gtfsrt.renfe.com/trip_updates.json',
  vehiclesLD: PROXY + 'https://gtfsrt.renfe.com/vehicle_positions_LD.json',
  tripUpdatesLD: PROXY + 'https://gtfsrt.renfe.com/trip_updates_LD.json',
  alerts: PROXY + 'https://gtfsrt.renfe.com/alerts.json',
  stopsCercanias:  'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/stops.csv',
  stopTimescercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/stop_times.csv',
  tripsCercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/trips.csv',
  routesCercanias: 'https://raw.githubusercontent.com/WireNext/cercaniasgtfs/refs/heads/main/data_csv/routes.csv',
  stopsLD: 'https://raw.githubusercontent.com/WireNext/laregorecorridogtfs/refs/heads/main/data_csv/stops.csv',
  stopTimesLD: 'https://raw.githubusercontent.com/WireNext/laregorecorridogtfs/refs/heads/main/data_csv/stop_times.csv',
  tripsLD: 'https://raw.githubusercontent.com/WireNext/laregorecorridogtfs/refs/heads/main/data_csv/trips.csv',
  routesLD: 'https://raw.githubusercontent.com/WireNext/laregorecorridogtfs/refs/heads/main/data_csv/routes.csv',
};

// ─── LOAD STATIC DATA ──────────────────────────────────
async function loadStaticData() {
  setProgress(5, 'Cargando paradas de Cercanías…');
  const [stopsCercanias, stopsLD] = await Promise.all([
    fetchCSV(URLS.stopsCercanias),
    fetchCSV(URLS.stopsLD),
  ]);
  stopsCercanias.forEach(s => {
    state.stops[s.stop_id] = { name: s.stop_name, lat: parseFloat(s.stop_lat), lon: parseFloat(s.stop_lon), type: 'cercanias' };
  });
  stopsLD.forEach(s => {
    if (!state.stops[s.stop_id])
      state.stops[s.stop_id] = { name: s.stop_name, lat: parseFloat(s.stop_lat), lon: parseFloat(s.stop_lon), type: 'ld' };
  });

  setProgress(25, 'Cargando rutas…');
  const [routesCercanias, routesLD] = await Promise.all([
    fetchCSV(URLS.routesCercanias),
    fetchCSV(URLS.routesLD),
  ]);
  routesCercanias.forEach(r => {
    state.routes[r.route_id] = { shortName: r.route_short_name, longName: r.route_long_name, color: r.route_color, type: 'cercanias' };
  });
  routesLD.forEach(r => {
    state.routes[r.route_id] = { shortName: r.route_short_name, longName: r.route_long_name, color: r.route_color, type: 'ld' };
  });

  setProgress(45, 'Cargando viajes…');
  const [tripsCercanias, tripsLD] = await Promise.all([
    fetchCSV(URLS.tripsCercanias),
    fetchCSV(URLS.tripsLD),
  ]);
  tripsCercanias.forEach(t => {
    state.trips[t.trip_id] = { routeId: t.route_id, headsign: t.trip_headsign, type: 'cercanias' };
  });
  tripsLD.forEach(t => {
    state.trips[t.trip_id] = { routeId: t.route_id, headsign: t.trip_headsign, type: 'ld' };
  });

  setProgress(60, 'Cargando horarios…');
  try {
    const [stCercanias, stLD] = await Promise.all([
      fetchCSV(URLS.stopTimescercanias),
      fetchCSV(URLS.stopTimesLD),
    ]);
    stCercanias.forEach(st => {
      if (!state.stopTimes[st.trip_id]) state.stopTimes[st.trip_id] = [];
      state.stopTimes[st.trip_id].push({ stopId: st.stop_id, arrival: st.arrival_time, departure: st.departure_time, seq: parseInt(st.stop_sequence) || 0 });
    });
    stLD.forEach(st => {
      if (!state.stopTimes[st.trip_id]) state.stopTimes[st.trip_id] = [];
      state.stopTimes[st.trip_id].push({ stopId: st.stop_id, arrival: st.arrival_time, departure: st.departure_time, seq: parseInt(st.stop_sequence) || 0 });
    });
    Object.keys(state.stopTimes).forEach(tid => {
      state.stopTimes[tid].sort((a, b) => a.seq - b.seq);
    });
  } catch(e) {
    console.warn('stop_times load error:', e);
  }

  setProgress(85, 'Conectando tiempo real…');
  renderStationMarkers();
}

// ─── LOAD REALTIME ─────────────────────────────────────
async function loadRealtime() {
  try {
    const [vcJson, tuJson, vldJson, tuldJson, alertJson] = await Promise.all([
      fetchJSON(URLS.vehiclesCercanias),
      fetchJSON(URLS.tripUpdatesCercanias),
      fetchJSON(URLS.vehiclesLD),
      fetchJSON(URLS.tripUpdatesLD),
      fetchJSON(URLS.alerts).catch(() => ({ entity: [] })),
    ]);

    state.realtimeDelays = {};
    [...(tuJson.entity || []), ...(tuldJson.entity || [])].forEach(e => {
      if (e.tripUpdate) {
        const tu = e.tripUpdate;
        const tid = tu.trip?.tripId;
        if (tid) {
          const upd = tu.stopTimeUpdate?.[0];
          state.realtimeDelays[tid] = {
            delay: tu.delay || upd?.arrival?.delay || 0,
            stopId: upd?.stopId,
            updatedTime: upd?.arrival?.time,
          };
        }
      }
    });

    const newVehicles = [];
    (vcJson.entity || []).forEach(e => {
      if (e.vehicle?.position) {
        const v = e.vehicle;
        newVehicles.push({
          id: e.id, tripId: v.trip?.tripId,
          lat: v.position.latitude, lon: v.position.longitude,
          label: v.vehicle?.label || e.id, stopId: v.stopId,
          status: v.currentStatus, type: 'cercanias',
        });
      }
    });
    (vldJson.entity || []).forEach(e => {
      if (e.vehicle?.position) {
        const v = e.vehicle;
        newVehicles.push({
          id: e.id, tripId: v.trip?.tripId,
          lat: v.position.latitude, lon: v.position.longitude,
          label: v.vehicle?.label || e.id, stopId: v.stopId,
          status: v.currentStatus, type: 'ld',
        });
      }
    });
    state.vehicles = newVehicles;

    // Update counts
    const cCount = newVehicles.filter(v => v.type === 'cercanias').length;
    const ldCount = newVehicles.filter(v => v.type === 'ld').length;
    document.getElementById('count-cercanias').textContent = cCount || '0';
    document.getElementById('count-ld').textContent = ldCount || '0';

    // Alerts
    const alerts = alertJson.entity || [];
    const activeAlerts = alerts.filter(a => a.alert?.headerText);
    if (activeAlerts.length > 0) {
      const banner = document.getElementById('alert-banner');
      const a = activeAlerts[0].alert;
      const txt = a.headerText?.translation?.[0]?.text || 'Incidencias activas en la red';
      document.getElementById('alert-text').textContent = `${activeAlerts.length} incidencia${activeAlerts.length > 1 ? 's' : ''}: ${txt.slice(0, 80)}${txt.length > 80 ? '…' : ''}`;
      banner.classList.add('visible');
      setTimeout(() => banner.classList.remove('visible'), 8000);
    }

    updateStatus('ok', `${newVehicles.length} trenes · ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`);
    renderMarkers();
  } catch(err) {
    console.error('Realtime error:', err);
    updateStatus('error', 'Error al conectar — reintentando…');
  }
}

// ─── STATUS ────────────────────────────────────────────
function updateStatus(type, msg) {
  const dot = document.getElementById('status-dot');
  const txt = document.getElementById('status-text');
  dot.className = 'status-dot ' + type;
  txt.textContent = msg;
}

// ─── MAP INIT ──────────────────────────────────────────
let map;
function initMap() {
  map = L.map('map', {
    center: [40.416775, -3.703790],
    zoom: 6,
    zoomControl: true,
    attributionControl: false,
    zoomAnimation: false,
    fadeAnimation: false,
    markerZoomAnimation: false,
  });

  map.setMaxBounds(null);
  map.off('popupopen');

  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

  const darkTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19, subdomains: 'abcd', opacity: isDark ? 1 : 0,
  }).addTo(map);

  const lightTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19, subdomains: 'abcd', opacity: isDark ? 0 : 1,
  }).addTo(map);

  L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  window._tileLayers = { dark: darkTile, light: lightTile };
  window.map = map;

  map.on('click', () => { closePanel(); closeStationPanel(); });
}

// ─── MARKERS ───────────────────────────────────────────
function getRouteLabel(tripId, type) {
  const trip = state.trips[tripId];
  if (!trip) return type === 'ld' ? 'LD' : 'C?';
  const route = state.routes[trip.routeId];
  if (!route) return type === 'ld' ? 'LD' : 'C?';
  const sn = route.shortName || '';
  return sn.slice(0, 3) || (type === 'ld' ? 'LD' : 'C?');
}

// Función auxiliar para generar el polígono SVG estilo Material 3 con el texto integrado
// Función para generar un polígono minimalista con silueta de tren (Estilo M3)
function createTrainSvgIcon(label, type) {
  let strokeColor = "var(--md-sys-color-outline-variant, #44444e)";
  
  // Dibujamos un polígono geométrico limpio que representa el frontal/cabina de un tren moderno
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" class="m3-train-svg">
      <path d="M6,6 C6,4.5 7.5,4 9,4 L23,4 C24.5,4 26,4.5 26,6 L26,24 C26,27 24,28 16,28 C8,28 6,27 6,24 Z" 
            class="m3-train-poly ${type}" 
            stroke="${strokeColor}" 
            stroke-width="1.5" 
            stroke-linejoin="round"/>
      
      <path d="M9,7 L23,7 C24,7 24,8 24,9 L24,12 C24,13 23,13.5 22,13.5 L10,13.5 C9,13.5 8,13 8,12 L8,9 C8,8 8,7 9,7 Z" 
            fill="rgba(255, 255, 255, 0.25)" />
      
      <circle cx="10" cy="24" r="1.5" fill="rgba(255,255,255,0.6)" />
      <circle cx="22" cy="24" r="1.5" fill="rgba(255,255,255,0.6)" />

      <text x="50%" y="60%" 
            text-anchor="middle" 
            dominant-baseline="middle" 
            class="m3-train-text">
        ${label}
      </text>
    </svg>
  `;
}

function renderMarkers() {
  const shown = new Set();
  state.vehicles.forEach(v => {
    if (v.type !== state.activeFilter) return;
    if (!v.lat || !v.lon || isNaN(v.lat) || isNaN(v.lon)) return;

    shown.add(v.id);
    const label = getRouteLabel(v.tripId, v.type);

    if (state.markers[v.id]) {
      // Actualizar posición
      state.markers[v.id].setLatLng([v.lat, v.lon]);
      
      // CORRECCIÓN CLAVE: Usamos innerHTML para actualizar la etiqueta sin destruir el tren SVG
      const el = state.markers[v.id].getElement();
      if (el) {
        el.innerHTML = createTrainSvgIcon(label, v.type);
      }
    } else {
      // Crear marcador por primera vez con el polígono del tren
      const icon = L.divIcon({
        className: 'm3-train-marker-wrapper',
        html: createTrainSvgIcon(label, v.type),
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([v.lat, v.lon], {
        icon,
        zIndexOffset: 100,
        draggable: false,
        keyboard: false
      }).addTo(map);

      marker.on('click', (e) => {
        e.originalEvent?.stopPropagation?.();
        openTrainPanel(v.id);
      });
      marker.on('mousedown', (e) => { e.originalEvent?.stopPropagation?.(); });
      marker.on('touchstart', (e) => { e.originalEvent?.stopPropagation?.(); });

      state.markers[v.id] = marker;
    }
  });

  // Eliminar marcadores ocultos
  Object.keys(state.markers).forEach(id => {
    if (!shown.has(id)) {
      map.removeLayer(state.markers[id]);
      delete state.markers[id];
    }
  });
}
// ─── STATION MARKERS ───────────────────────────────────
function renderStationMarkers() {
  if (window.stationLayer) {
    window.stationLayer.clearLayers();
  } else {
    window.stationLayer = L.layerGroup().addTo(map);
  }

  if (!RENFE_STATIONS || RENFE_STATIONS.length === 0) return;

  RENFE_STATIONS.forEach(st => {
    let lat = parseFloat(String(st.la || '').replace(',', '.'));
    let lon = parseFloat(String(st.lo || '').replace(',', '.'));
    if (isNaN(lat) || isNaN(lon)) return;

    const stName = st.n || 'Estación';
    const stIcon = L.divIcon({
      className: 'custom-station-icon',
      html: `<div style="width:10px;height:10px;background:#3b70a3;border:2px solid rgba(255,255,255,0.75);border-radius:50%;box-shadow:0 0 4px rgba(59,112,163,0.5);"></div>`,
      iconSize: [10, 10], iconAnchor: [5, 5]
    });

    const marker = L.marker([lat, lon], { icon: stIcon });
    marker.on('click', () => { openStationPanel(st); });
    marker.bindTooltip(stName, {
      permanent: false, direction: 'top',
      className: 'station-tooltip', offset: [0, -5]
    });

    window.stationLayer.addLayer(marker);
  });
}

// ─── HELPERS ───────────────────────────────────────────
function fixUtf8String(str) {
  if (!str) return '';
  try { return decodeURIComponent(escape(str)); } catch (e) { return str; }
}

function normalizeName(name) {
  return (name || '').toUpperCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9\s]/g, '').trim();
}

function findStopIdsForStation(renfeStation) {
  const codigoMapa = renfeStation.CODIGO || renfeStation.c || '';
  if (!codigoMapa) return [];
  const codigoMapaNorm = String(codigoMapa).trim().replace(/^0+/, '');
  const matches = new Set();
  Object.keys(state.stops).forEach(stopId => {
    const stopIdNorm = String(stopId).trim().replace(/^0+/, '');
    if (stopIdNorm === codigoMapaNorm) matches.add(stopId);
  });
  return [...matches];
}

// ─── STATION PANEL ─────────────────────────────────────
function openStationPanel(renfeStation) {
  document.getElementById('train-panel').classList.remove('open');
  state.selectedVehicle = null;

  const stName = renfeStation.n || renfeStation.DESCRIPCION || '';
  const stCe = renfeStation.ce || renfeStation.CERCANIAS || 'NO';
  const stFe = renfeStation.fe || renfeStation.FEVE || 'NO';
  const stPo = renfeStation.po || renfeStation.POBLACION || '';
  const stPr = renfeStation.pr || renfeStation.PROVINCIA || '';

  document.getElementById('station-panel-name').textContent = stName;
  const badge = document.getElementById('station-panel-badge');
  if (stCe === 'SI') {
    badge.textContent = 'Cercanías'; badge.className = 'train-badge badge-cercanias';
  } else if (stFe === 'SI') {
    badge.textContent = 'FEVE'; badge.className = 'train-badge badge-cercanias';
  } else {
    badge.textContent = 'Estación'; badge.className = 'train-badge badge-ld';
  }
  document.getElementById('station-panel-sub').textContent = `${stPo} · ${stPr}`;

  let stopIds = findStopIdsForStation(renfeStation) || [];
  stopIds = stopIds.map(id => String(id).trim());

  const now = new Date();
  const upcoming = [];

  if (stopIds.length > 0) {
    Object.entries(state.stopTimes).forEach(([rawTripId, stops]) => {
      const tripId = String(rawTripId).trim();
      stops.forEach(st => {
        if (!stopIds.includes(String(st.stopId).trim())) return;
        const arr = gtfsTimeToday(st.arrival);
        if (!arr) return;
        const delayInfo = state.realtimeDelays[tripId] || { delay: 0 };
        const delaySecs = delayInfo.delay || 0;
        const arrUpdated = new Date(arr.getTime() + delaySecs * 1000);
        const diffMins = (arrUpdated - now) / 60000;
        if (diffMins < -2 || diffMins > 180) return;
        let trip = state.trips[tripId];
        if (!trip) { const cleanId = tripId.split('-')[0].split('_')[0].trim(); trip = state.trips[cleanId]; }
        const finalTrip = trip || {};
        const route = state.routes[finalTrip.routeId] || {};
        upcoming.push({ tripId, st, arr, arrUpdated, delaySecs, trip: finalTrip, route });
      });
    });
  }

  upcoming.sort((a, b) => a.arrUpdated - b.arrUpdated);

  const seenRows = new Set();
  const uniqueUpcoming = upcoming.filter(item => {
    const type = (item.trip.type || 'ld');
    const routeLabel = (item.route.shortName || '').slice(0, 4) || (type === 'ld' ? 'LD' : 'C');
    const dest = fixUtf8String(item.trip.headsign || item.route.longName || item.tripId);
    const rowKey = `${routeLabel}-${dest}-${formatTime(item.arr)}`;
    if (seenRows.has(rowKey)) return false;
    seenRows.add(rowKey);
    return true;
  });

  const list = document.getElementById('station-trains-list');
  if (!list) return;
  list.innerHTML = '';

  if (uniqueUpcoming.length === 0) {
    list.innerHTML = `<div class="station-empty">
      ${stopIds.length === 0
        ? 'Esta estación no se encontró en los datos GTFS.<br><small style="opacity:0.6">Puede que opere solo trenes de larga distancia.</small>'
        : 'No hay trenes próximos en las próximas 3 horas.'}
    </div>`;
  } else {
    let html = '';
    uniqueUpcoming.slice(0, 20).forEach(item => {
      const { trip, route, arr, arrUpdated, delaySecs, tripId } = item;
      const type = (trip.type || 'ld');
      const routeLabel = (route.shortName || '').slice(0, 4) || (type === 'ld' ? 'LD' : 'C');
      const dest = fixUtf8String(trip.headsign || route.longName || `Tren ${tripId}`);
      const origTime = formatTime(arr);
      const updTime = Math.abs(delaySecs) >= 30 ? formatTime(arrUpdated) : null;
      const delayStr = formatDelay(delaySecs);
      const diffMins = Math.round((arrUpdated - now) / 60000);
      const inStr = diffMins <= 0 ? 'Ahora' : diffMins === 1 ? 'en 1 min' : `en ${diffMins} min`;
      let delayBadgeHtml = '';
      if (delayStr) {
        const cls = delaySecs > 0 ? 'delay-warn' : 'delay-ok';
        delayBadgeHtml = `<span class="station-delay-badge ${cls}">${delayStr}</span>`;
      }
      html += `<div class="station-train-item">
        <div class="station-route-badge ${type === 'ld' ? 'ld' : 'cercanias'}">${routeLabel}</div>
        <div class="station-train-info">
          <div class="station-train-dest">${dest}</div>
          <div class="station-train-times">
            ${updTime
              ? `<span class="station-train-time-orig">${origTime}</span><span class="station-train-time ${delaySecs > 0 ? 'delayed' : 'early'}">${updTime}</span>`
              : `<span class="station-train-time">${origTime}</span>`}
            <span style="font-size:0.68rem;color:var(--md-sys-color-outline)">${inStr}</span>
          </div>
        </div>
        ${delayBadgeHtml}
      </div>`;
    });
    list.innerHTML = html;
  }

  document.getElementById('station-panel').classList.add('open');

  const lat = renfeStation.la || parseFloat(renfeStation.LATITUD);
  const lon = renfeStation.lo || parseFloat(renfeStation.LONGITUD);
  if (!isNaN(lat) && !isNaN(lon)) {
    map.flyTo([lat, lon], Math.max(map.getZoom(), 12), { duration: 0.8 });
  }
}

function closeStationPanel() {
  document.getElementById('station-panel').classList.remove('open');
}

// ─── TRAIN PANEL ───────────────────────────────────────
function openTrainPanel(vehicleId) {
  const v = state.vehicles.find(x => x.id === vehicleId);
  if (!v) return;
  state.selectedVehicle = vehicleId;

  const trip = state.trips[v.tripId] || {};
  const route = state.routes[trip.routeId] || {};
  const delay = state.realtimeDelays[v.tripId];
  const delaySecs = delay?.delay || 0;

  const badge = document.getElementById('panel-badge');
  badge.textContent = v.type === 'ld' ? 'Larga Distancia' : 'Cercanías';
  badge.className = 'train-badge ' + (v.type === 'ld' ? 'badge-ld' : 'badge-cercanias');

  const sn = route.shortName || '';
  const headsign = trip.headsign || '';
  document.getElementById('panel-name').textContent = [sn, headsign].filter(Boolean).join(' · ') || v.label || v.id;

  const curStop = state.stops[v.stopId];
  document.getElementById('panel-sub').textContent = curStop ? `En: ${curStop.name}` : `ID: ${v.tripId || v.id}`;

  const delayChip = document.getElementById('panel-delay');
  const delayStr = formatDelay(delaySecs);
  if (!delayStr) {
    delayChip.textContent = 'A tiempo'; delayChip.className = 'delay-chip delay-ok';
  } else if (delaySecs < 0) {
    delayChip.textContent = delayStr + ' adelanto'; delayChip.className = 'delay-chip delay-ok';
  } else if (delaySecs < 300) {
    delayChip.textContent = delayStr; delayChip.className = 'delay-chip delay-warn';
  } else {
    delayChip.textContent = delayStr; delayChip.className = 'delay-chip delay-bad';
  }

  buildStopsTimeline(v, delaySecs);
  document.getElementById('train-panel').classList.add('open');
}

function buildStopsTimeline(v, delaySecs) {
  const list = document.getElementById('stops-list');
  list.innerHTML = '';

  const schedule = state.stopTimes[v.tripId];
  if (!schedule || schedule.length === 0) {
    list.innerHTML = '<div style="color:var(--md-sys-color-on-surface-variant);font-size:0.8rem;padding:16px 0;text-align:center">Horario no disponible para este tren</div>';
    return;
  }

  const now = new Date();
  let currentIdx = 0;
  for (let i = 0; i < schedule.length; i++) {
    const st = schedule[i];
    if (v.stopId && st.stopId === v.stopId) { currentIdx = i; break; }
    const arr = gtfsTimeToday(st.arrival);
    if (arr && arr < now) currentIdx = i;
  }

  const pastStops = schedule.slice(Math.max(0, currentIdx - 4), currentIdx);
  const futureStops = schedule.slice(currentIdx);

  if (pastStops.length > 0) {
    list.innerHTML += `<div class="section-label">Paradas anteriores</div>`;
    pastStops.forEach((st, i) => {
      const stop = state.stops[st.stopId] || { name: st.stopId };
      const name = fixUtf8String(stop.name || st.stopId);
      const arr = gtfsTimeToday(st.arrival);
      const isLast = i === pastStops.length - 1;
      list.innerHTML += stopItemHTML(name, st, 'past', arr, 0, isLast ? 'current' : 'past');
    });
  }
  if (futureStops.length > 0) {
    list.innerHTML += `<div class="section-label">Próximas paradas</div>`;
    futureStops.forEach((st, i) => {
      const stop = state.stops[st.stopId] || { name: st.stopId };
      const name = fixUtf8String(stop.name || st.stopId);
      const arr = gtfsTimeToday(st.arrival);
      const isCurrent = i === 0;
      list.innerHTML += stopItemHTML(name, st, isCurrent ? 'current' : 'future', arr, delaySecs, 'future');
    });
  }

  setTimeout(() => {
    const cur = list.querySelector('.stop-dot.current');
    if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function stopItemHTML(name, st, phase, arrDate, delaySecs, linePhase) {
  const isCurrent = phase === 'current';
  const isPast = phase === 'past';
  const origTime = arrDate ? formatTime(arrDate) : '--:--';
  let updatedTime = '';
  let timeClass = 'stop-time';

  if (!isPast && arrDate && delaySecs) {
    const updated = new Date(arrDate.getTime() + delaySecs * 1000);
    if (Math.abs(delaySecs) >= 30) {
      updatedTime = formatTime(updated);
      timeClass = delaySecs > 0 ? 'stop-time updated' : 'stop-time early';
    }
  }

  const dotClass = `stop-dot ${phase}`;
  const nameClass = `stop-name ${isPast ? 'past' : isCurrent ? 'current' : ''}`;

  return `<div class="stop-item">
    <div class="stop-line-col">
      <div class="${dotClass}"></div>
      <div class="stop-line ${linePhase}"></div>
    </div>
    <div class="stop-info">
      <div class="${nameClass}">${name}</div>
      <div class="stop-times">
        ${updatedTime
          ? `<span class="stop-time-orig">${origTime}</span><span class="${timeClass}">${updatedTime}</span>`
          : `<span class="${timeClass}">${origTime}</span>`}
      </div>
    </div>
  </div>`;
}

function closePanel() {
  document.getElementById('train-panel').classList.remove('open');
  state.selectedVehicle = null;
}

// ─── FILTERS (mutually exclusive) ──────────────────────
function initFilters() {
  document.querySelectorAll('.filter-segment[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      // Only switch if not already active
      if (state.activeFilter === f) return;
      state.activeFilter = f;

      document.querySelectorAll('.filter-segment').forEach(b => {
        const isActive = b.dataset.filter === f;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      renderMarkers();
    });
  });
}

// ─── POSITION UI ELEMENTS ──────────────────────────────
function positionUI() {
  const headerBar = document.querySelector('.top-app-bar');
  const safeTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0');
  const headerHeight = headerBar.offsetHeight + (parseInt(getComputedStyle(document.documentElement).paddingTop) || 0);
  const filterRow = document.getElementById('filter-row');
  const statusBar = document.getElementById('status-bar');
  const alertBanner = document.getElementById('alert-banner');

  const safeInset = parseFloat(getComputedStyle(document.body).paddingTop || 0);
  const totalHeaderH = document.getElementById('header').offsetHeight;
  const filterH = filterRow.offsetHeight;

  filterRow.style.top = totalHeaderH + 'px';
  statusBar.style.top = (totalHeaderH + filterH + 10) + 'px';
  alertBanner.style.top = (totalHeaderH + filterH + 40) + 'px';
}

// ─── PWA ───────────────────────────────────────────────
let deferredPrompt = null;

function initPWA() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  if (isStandalone) return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(() => {
      document.getElementById('pwa-prompt').classList.add('visible');
    }, 5000);
  });

  document.getElementById('pwa-install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
    }
    document.getElementById('pwa-prompt').classList.remove('visible');
  });

  document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
    document.getElementById('pwa-prompt').classList.remove('visible');
  });

  window.addEventListener('appinstalled', () => {
    document.getElementById('pwa-prompt').classList.remove('visible');
    deferredPrompt = null;
  });
}

function injectManifest() {
  const manifest = {
    name: 'TuTren – Trenes en tiempo real',
    short_name: 'TuTren',
    description: 'Rastreo de trenes de Renfe en tiempo real',
    start_url: '.', display: 'standalone',
    background_color: '#121218', theme_color: '#121218',
    orientation: 'portrait',
    icons: [
      { src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" fill="%23121218" rx="40"/><text y="140" x="96" text-anchor="middle" font-size="120">🚆</text></svg>', sizes: '192x192', type: 'image/svg+xml' },
    ]
  };
  const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
  document.getElementById('manifest-link').href = URL.createObjectURL(blob);
}

// ─── EVENT LISTENERS ───────────────────────────────────
document.getElementById('panel-close').addEventListener('click', closePanel);
document.getElementById('station-panel-close').addEventListener('click', closeStationPanel);
document.getElementById('alert-banner').addEventListener('click', () => {
  document.getElementById('alert-banner').classList.remove('visible');
});

document.getElementById('refresh-btn').addEventListener('click', async () => {
  const btn = document.getElementById('refresh-btn');
  btn.classList.add('spinning');
  updateStatus('loading', 'Actualizando…');
  await loadRealtime();
  btn.classList.remove('spinning');
});

// Panel drag to close
function setupPanelDrag(panelId, closeFn) {
  const panel = document.getElementById(panelId);
  let startY = 0;
  panel.addEventListener('touchstart', e => { e.stopPropagation(); startY = e.touches[0].clientY; }, { passive: true });
  panel.addEventListener('touchend', e => {
    e.stopPropagation();
    if (e.changedTouches[0].clientY - startY > 60) closeFn();
  }, { passive: true });
  panel.addEventListener('click', e => { e.stopPropagation(); });
}

// ─── MAIN ──────────────────────────────────────────────
async function main() {
  injectManifest();
  initPWA();
  initMap();
  positionUI();
  window.addEventListener('resize', positionUI);
  initFilters();

  setupPanelDrag('train-panel', closePanel);
  setupPanelDrag('station-panel', closeStationPanel);

  try {
    await loadStaticData();
    setProgress(95, 'Casi listo…');
    await loadRealtime();
    setProgress(100, 'Listo');
    setTimeout(() => {
      const loading = document.getElementById('loading');
      loading.classList.add('fade');
      setTimeout(() => loading.remove(), 400);
    }, 300);
  } catch(err) {
    console.error(err);
    document.getElementById('loading-text').textContent = 'Error al cargar datos. Reintentando…';
    setTimeout(main, 3000);
    return;
  }

  setInterval(loadRealtime, 30000);
}

main();