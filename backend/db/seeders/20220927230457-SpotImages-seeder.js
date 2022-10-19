'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131502/spot1/84655542-0400-485c-b8f8-f975015c2922_jldztx.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666132951/spot1/download-1_vdkn2z.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131502/spot1/283207ad-7689-44a5-a2df-d58b4aae3380_cznv0o.webp',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131502/spot1/d7412762-dc26-48bd-8137-ca6f316cb2df_qucf6w.webp',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131502/spot1/fb1dc5be-4f29-4048-a27f-c4530acf7c82_bje2uw.webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131478/spot2/39595cb4-a927-4a67-8734-49121e47f126_lwmcea.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666132946/spot2/images_bhrggq.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131478/spot2/472bea0d-36b9-404b-9b43-3bf75feb870b_m3xokz.webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131478/spot2/4fb1bfa8-65b5-4db4-9149-e2c68608a160_zehxmp.webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131478/spot2/3bfaa6e5-6466-4b0a-8a64-9400a3ee53c6_sra44x.webp',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131462/spot3/cbd8c41e-9c7d-4f6d-8aac-bd62a8a00389_rxyhfw.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131462/spot3/25d2b32e-d3a5-4308-b509-02a3ed8b4dcb_y4psww.webp',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131462/spot3/10775cde-de62-46f8-bb2c-74ede50589e9_lkphku.webp',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131462/spot3/a8fd5e3d-42f1-4faf-80a4-ba9b6e340470_jw4kta.webp',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666051397/spot3/download_d29pgs.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131428/spot4/ffcc6215-0b1c-4e8c-b2e0-473b3c801014_tt4rs0.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131428/spot4/3c56533f-5eee-4ac5-b9f2-bf4552ace4bf_hp2tab.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131428/spot4/c278171f-45be-4ff6-803a-7aa6a76c373b_db3iah.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131428/spot4/b0a6016f-ca09-4b4e-a2a3-de9a4bb8faa7_xi2kag.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666051395/spot4/download-2_ejbmiq.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131388/spot5/d5a43367-482a-479a-9eaf-3fe30cc540ea_jf2mhf.webp',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131388/spot5/8be07a40-7b84-47b4-9919-00aac95fd4d7_c9viqy.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131388/spot5/7e2cd62b-3950-4775-8c55-03b6444aca1b_g2nmjg.webp',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131388/spot5/1258bce9-ab43-4411-a281-5479239fc307_yyw5va.webp',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666051405/spot5/download-4_jae1e6.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131355/spot6/a6275d85-daa0-4416-9316-7c4b49c94caa_yjlgii.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131355/spot6/9033fa64-9101-4dd7-a110-fa42edfb406c_xwx95e.webp',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131355/spot6/abf5c86e-9de2-424c-abd0-488c23a9517d_aexu6f.webp',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131355/spot6/5cdf35c9-0751-4e9e-852d-baaae35532a1_osaksr.webp',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666051400/spot6/download-1_ggcefc.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131314/spot7/8fe21806-e4bf-42b0-8957-940549706482_ia4jej.webp',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131314/spot7/0d34f7da-14ad-469b-a218-1a2668acd428_obrlhf.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131314/spot7/62dd228e-4b70-47cc-a769-cb6790420e24_ae2ov0.webp',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131314/spot7/c530642f-8efa-4576-83e7-5e123376cc50_p2fjyi.webp',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666051403/spot7/download-3_xr0vjq.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131271/spot8/ad669e9a-c8c4-47b6-b2ad-2bd54c060059_rirnya.webp',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131271/spot8/1c5c53ba-35fb-4b72-a11b-0e09b1be4d24_yuregp.webp',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131271/spot8/5b3872b7-fc85-4e67-bd3b-dc69e298dae3_s7hvuu.webp',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131271/spot8/dd0382bf-37ce-41d7-8180-498bc699673e_o5xw54.webp',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666051402/spot8/images_ulqdkv.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131215/spot9/f78ab649-e5de-4535-ac6a-2a74fe549998_xlcwsd.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131215/spot9/4fb2a843-1055-4136-9814-b4b823bda619_pgaobi.webp',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131215/spot9/a676abe6-576a-4986-9cab-b0d82bb47af0_xehctj.webp',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131215/spot9/088e475e-5885-4e5e-87e8-eb4300abfb93_irgmsc.webp',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666051389/spot9/download-7_mixc93.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131153/spot10/38794512-d935-4268-837e-246d470bde04_axbk24.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131153/spot10/6fc231cc-ded8-43f1-854e-844e33f0dfe0_jre8vm.webp',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131153/spot10/f405147e-dc8d-4c53-a127-50e17ef729c3_vooioi.webp',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666131153/spot10/d297bacf-2202-4849-a92f-4d763f855ed7_a91l48.webp',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://res.cloudinary.com/dydhvazpw/image/upload/v1666051391/spot10/download-6_abzusc.jpg',
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('SpotImages', {
      url: ['demoSpot1 url', 'demoSpot2 url', 'demoSpot3 url']
    })
  }
};
