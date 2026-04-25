export type GalleryImage = {
  url: string;
  caption: string;
  category: "Sailing" | "Islands" | "Onboard";
};

const S3_ASSETS_BASE = "https://burma-sailing-assets.s3.eu-north-1.amazonaws.com";

type RawGalleryImage = GalleryImage;

const rawGalleryImages: RawGalleryImage[] = [
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993976/viber_image_2026-03-19_09-00-24-481_w0aimx.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993976/viber_image_2026-03-19_09-00-23-645_keorji.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774075394/d566b5fc-6771-4216-bebc-70d4055779c3_plzprg.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774075394/3abed6e5-a294-43a7-812a-86d08d94064b_ci0mqq.jpg",
    caption: "",
    category: "Onboard",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993978/viber_image_2026-03-19_09-00-26-594_dub4nt.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993980/viber_image_2026-03-19_09-00-26-550_tebxou.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993980/viber_image_2026-03-19_09-00-26-149_wjs46c.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993976/viber_image_2026-03-19_09-00-26-080_oqjzth.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993978/viber_image_2026-03-19_09-00-26-646_uuvgf5.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993973/viber_image_2026-03-19_08-56-59-499_yldjjb.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993973/viber_image_2026-03-19_08-56-59-456_nkpi9l.jpg",
    caption: "",
    category: "Onboard",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993970/viber_image_2026-03-19_08-58-20-077_vjrvvw.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993970/viber_image_2026-03-19_08-58-19-806_twqczy.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773993972/viber_image_2026-03-19_08-58-20-037_rpvrnj.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983758/viber_image_2026-03-19_08-56-54-160_mjco2c.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983758/viber_image_2026-03-20_09-12-14-102_fgaouz.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983758/viber_image_2026-03-19_08-56-54-372_ljqmdh.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983758/viber_image_2026-03-19_08-56-54-422_vgz9mp.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983758/viber_image_2026-03-19_08-56-54-243_nhitjg.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983759/viber_image_2026-03-19_08-56-54-471_dlftjw.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983758/viber_image_2026-03-19_08-56-53-676_xchhkq.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983756/viber_image_2026-03-20_09-12-14-022_skp73s.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983755/viber_image_2026-03-19_09-18-42-184_qn1xcy.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983756/viber_image_2026-03-20_08-30-44-471_visy4t.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983756/viber_image_2026-03-20_08-30-49-219_pxdk4u.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983756/viber_image_2026-03-19_09-18-42-233_dnjxdf.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983755/viber_image_2026-03-19_09-18-42-067_pyiawu.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983755/viber_image_2026-03-19_09-18-42-014_iiwfpi.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983755/viber_image_2026-03-19_09-18-42-117_okjmdb.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983754/viber_image_2026-03-19_09-18-41-950_smbgvj.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983753/viber_image_2026-03-19_09-18-41-452_d1kxbd.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983753/viber_image_2026-03-19_09-18-41-373_wvnr5y.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983752/viber_image_2026-03-19_09-18-41-318_t81s7e.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983751/viber_image_2026-03-19_09-18-40-161_xisnmb.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983751/viber_image_2026-03-19_09-18-41-126_ycokjb.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983749/viber_image_2026-03-19_09-10-13-187_q8eepb.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983749/viber_image_2026-03-19_09-18-39-559_k7owia.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983749/viber_image_2026-03-19_09-10-13-241_i9cmb3.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983749/viber_image_2026-03-19_09-10-12-919_pz8zzl.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983748/viber_image_2026-03-19_09-10-12-858_faw5lm.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983748/viber_image_2026-03-19_09-10-12-291_vm2axo.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983747/viber_image_2026-03-19_09-10-12-687_vrm8on.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983747/viber_image_2026-03-19_09-10-12-586_pqbwh7.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983746/viber_image_2026-03-19_09-10-12-435_x58dzg.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983746/viber_image_2026-03-19_09-10-12-186_ebgmuj.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983745/viber_image_2026-03-19_09-10-09-959_eztvfq.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983745/viber_image_2026-03-19_09-10-11-869_krgpjd.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983745/viber_image_2026-03-19_09-10-09-387_oaxqtm.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983745/viber_image_2026-03-19_09-10-10-063_xsqmw5.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983744/viber_image_2026-03-19_09-10-07-483_phswca.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983743/viber_image_2026-03-19_09-10-07-791_kz2ltw.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983744/viber_image_2026-03-19_09-10-08-105_cuikw6.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983743/viber_image_2026-03-19_09-10-09-093_obs4dr.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983743/viber_image_2026-03-19_09-10-07-977_p6mq1s.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983741/viber_image_2026-03-19_09-10-06-107_ksftvm.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983741/viber_image_2026-03-19_09-05-58-488_vnyxli.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983740/viber_image_2026-03-19_09-05-58-228_xsu8wy.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983740/viber_image_2026-03-19_09-05-58-623_ioqfxj.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983740/viber_image_2026-03-19_09-05-58-145_nb1emg.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983739/viber_image_2026-03-19_09-05-57-798_tz5w68.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983738/viber_image_2026-03-19_09-05-57-889_tffjir.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983737/viber_image_2026-03-19_09-05-57-751_g5hvr1.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983737/viber_image_2026-03-19_09-05-55-307_fch3hu.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983736/viber_image_2026-03-19_09-05-57-642_gcrijs.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983736/viber_image_2026-03-19_09-05-55-236_dxzzpt.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983735/viber_image_2026-03-19_09-05-55-145_gaopfp.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983734/viber_image_2026-03-19_09-05-55-190_rvlco9.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983734/viber_image_2026-03-19_09-05-54-779_pntzfu.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983734/viber_image_2026-03-19_09-05-54-464_hatvcu.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983734/viber_image_2026-03-19_09-05-54-739_nzbgat.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983732/viber_image_2026-03-19_09-05-54-216_mrnzed.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983732/viber_image_2026-03-19_09-05-54-329_xhxg4q.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983732/viber_image_2026-03-19_09-05-54-402_fvhznx.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983732/viber_image_2026-03-19_09-05-54-085_rusxxh.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983732/viber_image_2026-03-19_09-05-53-433_agqi0d.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983731/viber_image_2026-03-19_09-05-53-315_boe7oi.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983731/viber_image_2026-03-19_09-05-53-362_aqwiiq.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983730/viber_image_2026-03-19_09-05-52-989_hdfm9d.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983730/viber_image_2026-03-19_09-05-52-850_xxak6m.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983729/viber_image_2026-03-19_09-03-30-685_tkdahn.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983729/viber_image_2026-03-19_09-05-52-773_wxd668.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983729/viber_image_2026-03-19_09-03-29-984_udmmvu.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983728/viber_image_2026-03-19_09-03-30-193_itp4uj.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983728/viber_image_2026-03-19_09-03-30-596_s6k25j.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983728/viber_image_2026-03-19_09-03-29-900_sdujh4.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983727/viber_image_2026-03-19_09-03-30-028_jfb0yk.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983727/viber_image_2026-03-19_09-03-29-845_tjezxp.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983727/viber_image_2026-03-19_09-03-29-739_wjmyip.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983727/viber_image_2026-03-19_09-03-29-649_oo3j9k.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983726/viber_image_2026-03-19_09-03-29-225_jq93kd.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983725/viber_image_2026-03-19_09-03-29-337_v5p5ys.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983725/viber_image_2026-03-19_09-03-29-271_aiyvtm.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983724/viber_image_2026-03-19_09-03-29-098_cqosce.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983724/viber_image_2026-03-19_09-03-29-052_jgbcej.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983723/viber_image_2026-03-19_09-03-28-652_vpyojj.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983722/viber_image_2026-03-19_09-03-29-005_nw7we5.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983722/viber_image_2026-03-19_09-03-28-520_yzgnuv.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983722/viber_image_2026-03-19_09-03-28-565_pibvjs.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983722/viber_image_2026-03-19_09-03-28-612_estxxi.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983721/viber_image_2026-03-19_09-03-28-461_zshxw8.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983720/viber_image_2026-03-19_09-03-28-385_meswqn.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983720/viber_image_2026-03-19_09-03-28-322_ntlofu.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983719/viber_image_2026-03-19_09-03-27-632_lcn9hu.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1773983719/viber_image_2026-03-19_09-03-27-505_sytocf.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170965/f2ad14a7-b746-4682-9925-af411bbd7695_cb6bne.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170965/fee5c717-58b9-445d-b628-7c64ba31ad3f_ys8ceq.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170964/e2c45463-d0d0-4db9-ab09-7a939fde1517_gkpzu2.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170964/f6a64324-4bcc-48c4-96f8-72068d0547a6_thgagy.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170962/c1ade7e7-211e-44dd-b612-8fc3bf1ff3bc_v3pcks.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170965/ff5790b7-3636-4a0c-bb5c-306755a45130_imquqy.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170963/d780ad80-1ebe-4d16-9dbb-8735b14e1be6_gnqnka.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170963/e658dad2-b386-4964-88c4-d7d3f80a6a9a_noapxw.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170962/c8e59049-35e4-4ebc-9643-a7f7a25408cb_ihtpkh.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170959/b59ddcfc-7de3-41a7-bc8d-7b6c18bf9cdd_hqgpar.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170952/6830393f-9d67-4bc2-a84d-e88afb9c9c59_l2jdlj.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170950/a412e763-5daa-4e90-8f4c-04475b6470a2_kelwni.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170927/392e8705-f8b3-4542-be26-7b05fb6fa640_u66qgd.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170927/21824db7-b647-4ad3-ad5f-0b254459a565_av4wsw.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170927/991cb749-d534-4c1f-aaec-b1ed75f60a5a_eziyxr.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170925/11667e73-7e86-4aa0-8a8a-5749ed4d33e8_vz06ry.jpg",
    caption: "",
    category: "Sailing",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170926/83104a5b-6ce6-4215-befe-d875f0a5ac70_lsiouh.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170925/8412e208-6ca5-46cb-8c83-fd37678c0933_gjr03c.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170924/6993a791-bfaf-419e-ab7b-0c7cf2eaafab_dh5bjr.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170925/07373b92-1c25-4825-80d1-c3886a4ab810_zjf7lv.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170924/5119f69c-357e-4d1c-b6d1-db86a0134143_dpyk8c.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170924/6b3174e8-b57b-45e5-ad7c-41e4531b0629_wtypvt.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170924/03b9cebf-1ac0-4268-a854-04b525188035_utkbb0.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170923/70aba0b0-3477-47f7-80f9-f1c08bcbf7ad_uauavq.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170922/7bc75bf3-8559-4799-915f-e9441294a043_fxplvw.jpg",
    caption: "",
    category: "Islands",
  },
  {
    url: "https://res.cloudinary.com/dvbgmlsvl/image/upload/v1774170922/3582cf53-abeb-4214-bb17-4c0779709736_ckrsp4.jpg",
    caption: "",
    category: "Islands",
  },
];

/** Direct S3 keys (same bucket as viber assets). MP4 and other non-images excluded. */
const S3_UUID_GALLERY_FILENAMES = [
  "02be9549-f261-45b2-bacb-9b527b276cd3.JPG",
  "0569e968-45d3-42f6-9d1b-0a140101f434.JPG",
  "076db060-dabd-4eac-993e-f2f2238f56e8.JPG",
  "0caed951-9059-48bf-a8ec-1c4267f25964.JPG",
  "0d6096d6-156b-451e-873d-a76ad64f8e0c.JPG",
  "0f57832d-7a27-4bef-9e9a-ecf13bd8b27b.JPG",
  "107016e8-1be5-44bf-89f1-03bbf9e26514.JPG",
  "111897e0-b633-4b83-925e-6bceca4ef913.JPG",
  "113df868-fb47-4cad-9d59-cabb3f0b9258.JPG",
  "11667e73-7e86-4aa0-8a8a-5749ed4d33e8.JPG",
  "15908664-cfa4-4f33-b129-538c629ba4ff.JPG",
  "1a71ebe1-0cac-4420-82b9-22ef1f0d24c5.JPG",
  "1b22e7b5-e80a-456a-af4b-dfa4343ac08d.JPG",
  "1e56fe53-b1f2-4d45-8c17-f6805817b098.JPG",
  "1faf7838-5bbb-4da2-8f2a-e86d27367650.JPG",
  "203ddd8b-a3da-40c0-9a13-568d4fd3064b.JPG",
  "21174813-a046-4a5d-8e10-4439cf736eef.JPG",
  "21824db7-b647-4ad3-ad5f-0b254459a565.JPG",
  "23b11a8e-76aa-4e4d-bfc7-a1cc5129f261.JPG",
  "29d37bea-5bfb-4f31-93d9-5ef9117178b4.JPG",
  "2ce2b454-da85-4783-99fb-478ba7727334.JPG",
  "369f1d1e-583e-472f-8b9a-392facebd8ee.JPG",
  "38093d21-35f0-4709-934b-e1b01530654c.JPG",
  "399e474f-cf70-4995-adad-5868f5129521.JPG",
  "3bad00a2-609f-45f3-b35a-02aea4d42b90.JPG",
  "3c8bdc6e-d245-4892-a6e9-9eb6c2cb735f.JPG",
  "3cf06f1e-b389-4de3-9857-e749c609228b.JPG",
  "3d243926-c1ad-4ea5-bfe6-57c0bed32ca2.JPG",
  "3ea6a29f-2bee-4dc3-92dc-186f65d87259.JPG",
  "412d6d78-0e69-456e-9ea2-9b5c138f3e56.JPG",
  "42c9af5c-a0d3-4c68-a65d-9bd623b75565.JPG",
  "485e0e5e-4dc8-489b-9b12-4194f797f037.JPG",
  "4a2ef7a1-4379-4902-9ac4-a249ec47af39.JPG",
  "4af0c9fc-91f0-496a-97cd-5edf7571b63b.JPG",
  "4e11ee0c-803e-4238-8e61-d028dd2e9b19.JPG",
  "4e120045-34ce-45fb-820f-171eaa0b0118.JPG",
  "4f24b3c7-e830-4ab3-a714-d74b8e293d91.JPG",
  "53be3f87-6c93-47a3-9796-cc5049e33d3e.JPG",
  "54cc2372-ff5f-4b3e-b64e-9d5812fbb4df.JPG",
  "56d4adf0-a526-4160-9e37-f6046e7e3231.JPG",
  "57187298-c724-4d8f-bedd-8fd221230407.JPG",
  "5ce2582f-d203-4219-b3e1-cf7aaf53f343.JPG",
  "601c12f5-ebc6-4252-8f26-81329f504aaf.JPG",
  "615ff71e-de34-48ed-b8b9-8a9762655b67.JPG",
  "61b6c8ac-0fad-433f-9b49-23cb77116234.JPG",
  "62bbb717-8d9e-40a0-9736-09460c175389.JPG",
  "63e9648e-8022-400c-86a5-f76c795d7785.JPG",
  "6688f9bc-e531-4f70-b18d-34d966c5a6bb.JPG",
  "6cc16e91-52cf-47a9-b971-e6231759c7f7.JPG",
  "6d0c0639-cf0e-406c-a54c-07718346678d.JPG",
  "71eabfc7-2183-4e32-b3e9-3b511dc484e2.JPG",
  "7446725b-382b-450f-9a44-38428e43f73a.JPG",
  "7550f91d-9176-41f9-a9c5-f2340e931d31.JPG",
  "7827b1a2-e542-4220-8137-cb063194e9bc.JPG",
  "7a486483-1f84-43e8-89a5-18523959f02f.JPG",
  "7b133cc8-5a3c-4d5c-ad47-37b2b2d20d33.JPG",
  "7ec8065b-f50f-45b7-8fe1-666bb86b145b.JPG",
  "7f331292-32af-48c8-b9a2-1761a0226478.JPG",
  "81618fe2-71b3-4b8f-a992-a359d1647eb1.JPG",
  "83104a5b-6ce6-4215-befe-d875f0a5ac70.JPG",
  "84352c1c-f4c4-4a47-ab3b-1c8130e810c3.JPG",
  "84fb8eea-7ee4-4375-b75e-dc75384da07f.JPG",
  "87395965-7659-46d6-aff4-dbf96bab96d9.JPG",
  "89257a62-1e42-4f8d-aa41-8b8f55d9e515.JPG",
  "8bb4a05c-567c-4ec0-a10a-4e61f24791b7.JPG",
  "8cff2450-32a5-4937-b713-ca3de5691e5a.JPG",
  "8d28ec11-0675-4f43-a899-879de950c0fa.JPG",
  "8e173887-82c7-4694-abb8-9df6662305d0.JPG",
  "8efc3418-657e-4036-954e-b3aa077907e5.JPG",
  "90971316-c2cc-4686-b33a-06225853d80f.JPG",
  "92bc3619-da1f-4adf-9a30-f9ac9eeb9f86.JPG",
  "9421b6ba-dd1c-4b2a-941b-ab0334e04be9.JPG",
  "9b08f93f-e8a8-47f2-b201-dae601fea4f6.JPG",
  "9e14dee1-7d58-4860-9c01-204cea9d6e98.JPG",
  "9e34c6d6-65e4-4e74-9d0d-fd41a39e5c93.JPG",
  "9e6ba41a-acf4-417e-b52c-c0a761f75019.JPG",
  "9fa1cc51-5d2b-45f8-810b-564d60ca1661.JPG",
] as const;

const CATEGORY_CYCLE: GalleryImage["category"][] = [
  "Sailing",
  "Islands",
  "Onboard",
];

function normalizeViberFilename(filename: string): string {
  // viber_image_..._abcdef.jpg -> viber_image_....jpg
  return filename.replace(/_(?:[a-z0-9]{6,})\.(jpg|jpeg|png|webp)$/i, ".$1");
}

function toS3FromCloudinaryImageUrl(url: string): string {
  const filename = url.split("?")[0]?.split("/").pop();
  if (!filename) return url;
  return `${S3_ASSETS_BASE}/${normalizeViberFilename(filename)}`;
}

const galleryImagesFromViber: GalleryImage[] = rawGalleryImages
  .filter((img) => img.url.includes("/viber_image_"))
  .map((img) => ({
    ...img,
    url: toS3FromCloudinaryImageUrl(img.url),
  }));

const s3UuidGalleryImages: GalleryImage[] = S3_UUID_GALLERY_FILENAMES.map(
  (filename, i) => ({
    url: `${S3_ASSETS_BASE}/${filename}`,
    caption: "",
    category: CATEGORY_CYCLE[i % CATEGORY_CYCLE.length]!,
  }),
);

export const galleryImages: GalleryImage[] = [
  ...galleryImagesFromViber,
  ...s3UuidGalleryImages,
];