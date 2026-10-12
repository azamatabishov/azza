import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

type Schedule = {
  time: string;
  booked: boolean;
};

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  icon: string;
  schedule: Schedule[];
};

type Hospital = {
  id: string;
  name: string;
  icon: string;
  address: string;
  phone: string;
  workingTime: string;
  description: string;
  doctors: string[];
};

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Жиенбаев Еркін",
    specialty: "Стоматолог",
    icon: "🦷",
    schedule: [
      { time: "09:00", booked: false },
      { time: "10:00", booked: true },
      { time: "11:00", booked: false },
      { time: "12:00", booked: true },
      { time: "14:00", booked: false },
      { time: "15:00", booked: false },
      { time: "16:00", booked: true },
    ],
  },
  {
    id: "2",
    name: "Тұрсын Мадияр",
    specialty: "Педиатр",
    icon: "👶",
    schedule: [
      { time: "09:00", booked: true },
      { time: "10:00", booked: false },
      { time: "11:00", booked: false },
      { time: "12:00", booked: true },
      { time: "14:00", booked: false },
      { time: "15:00", booked: true },
      { time: "16:00", booked: false },
    ],
  },
  {
    id: "3",
    name: "Қалжанов Кенже",
    specialty: "Терапевт",
    icon: "🩺",
    schedule: [
      { time: "09:00", booked: false },
      { time: "10:00", booked: false },
      { time: "11:00", booked: true },
      { time: "12:00", booked: false },
      { time: "14:00", booked: true },
      { time: "15:00", booked: false },
      { time: "16:00", booked: false },
    ],
  },
  {
    id: "4",
    name: "Мамыржан Димаш",
    specialty: "Кардиолог",
    icon: "❤️",
    schedule: [
      { time: "09:00", booked: true },
      { time: "10:00", booked: true },
      { time: "11:00", booked: false },
      { time: "12:00", booked: false },
      { time: "14:00", booked: false },
      { time: "15:00", booked: true },
      { time: "16:00", booked: false },
    ],
  },
  {
    id: "5",
    name: "Абишов Азамат",
    specialty: "Хирург",
    icon: "⚕️",
    schedule: [
      { time: "09:00", booked: false },
      { time: "10:00", booked: true },
      { time: "11:00", booked: true },
      { time: "12:00", booked: false },
      { time: "14:00", booked: false },
      { time: "15:00", booked: false },
      { time: "16:00", booked: true },
    ],
  },
  {
    id: "6",
    name: "Тұраров Алмат",
    specialty: "Невролог",
    icon: "🧠",
    schedule: [
      { time: "09:00", booked: true },
      { time: "10:00", booked: false },
      { time: "11:00", booked: false },
      { time: "12:00", booked: true },
      { time: "14:00", booked: true },
      { time: "15:00", booked: false },
      { time: "16:00", booked: false },
    ],
  },
  {
    id: "7",
    name: "Ержан Мақсат",
    specialty: "Офтальмолог",
    icon: "👁️",
    schedule: [
      { time: "09:00", booked: false },
      { time: "10:00", booked: true },
      { time: "11:00", booked: false },
      { time: "12:00", booked: false },
      { time: "14:00", booked: true },
      { time: "15:00", booked: false },
      { time: "16:00", booked: true },
    ],
  },
  {
    id: "8",
    name: "Тұрлықожа Алмат",
    specialty: "Дерматолог",
    icon: "🧴",
    schedule: [
      { time: "09:00", booked: true },
      { time: "10:00", booked: false },
      { time: "11:00", booked: true },
      { time: "12:00", booked: false },
      { time: "14:00", booked: false },
      { time: "15:00", booked: true },
      { time: "16:00", booked: false },
    ],
  },
];

const hospitals: Hospital[] = [
  {
    id: "1",
    name: "№1 Hospital",
    icon: "🏥",
    address: "Алматы қаласы, Абай даңғылы 10",
    phone: "+7 700 111 11 11",
    workingTime: "09:00 - 18:00",
    description:
      "Заманауи медициналық қызмет көрсететін көпсалалы аурухана.",
    doctors: [
      "Стоматолог",
      "Терапевт",
      "Кардиолог",
      "Хирург",
    ],
  },
  {
    id: "2",
    name: "№2 Hospital",
    icon: "🏨",
    address: "Алматы қаласы, Достық көшесі 25",
    phone: "+7 700 222 22 22",
    workingTime: "08:00 - 20:00",
    description:
      "Балалар мен ересектерге медициналық көмек көрсететін аурухана.",
    doctors: [
      "Педиатр",
      "Терапевт",
      "Невролог",
      "Офтальмолог",
    ],
  },
  {
    id: "3",
    name: "№3 Hospital",
    icon: "🏥",
    address: "Алматы қаласы, Төле би көшесі 45",
    phone: "+7 700 333 33 33",
    workingTime: "09:00 - 19:00",
    description:
      "Диагностика және емдеу қызметтері көрсетілетін медициналық орталық.",
    doctors: [
      "Кардиолог",
      "Хирург",
      "Дерматолог",
      "Терапевт",
    ],
  },
  {
    id: "4",
    name: "№4 Hospital",
    icon: "🏨",
    address: "Алматы қаласы, Райымбек даңғылы 80",
    phone: "+7 700 444 44 44",
    workingTime: "08:30 - 18:30",
    description:
      "Пациенттерге кең көлемде медициналық қызмет көрсететін аурухана.",
    doctors: [
      "Стоматолог",
      "Педиатр",
      "Невролог",
      "Дерматолог",
    ],
  },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Парольді көрсету
  const [showPassword, setShowPassword] = useState(false);

  // Есте сақтау
  const [rememberMe, setRememberMe] = useState(false);

  // Қате мәтіні
  const [error, setError] = useState("");

  const [selectedDoctor, setSelectedDoctor] =
    useState<Doctor | null>(null);

  const [selectedHospital, setSelectedHospital] =
    useState<Hospital | null>(null);

  const [myAppointments, setMyAppointments] =
    useState<string[]>([]);

  // Қазіргі ашылған бет
  const [currentPage, setCurrentPage] =
    useState("home");

  // Избранный дәрігерлер
  const [favoriteDoctors, setFavoriteDoctors] =
    useState<string[]>([]);

  const handleLogin = () => {
    setError("");

    // Логин бос болса
    if (login.trim() === "") {
      setError("Логинді енгізіңіз!");
      return;
    }

    // Пароль бос болса
    if (password.trim() === "") {
      setError("Парольді енгізіңіз!");
      return;
    }

    // Пароль 6 символдан аз болса
    if (password.length < 6) {
      setError(
        "Қате! Пароль кемінде 6 символдан тұруы керек."
      );
      return;
    }

    // Есте сақтау қосылған болса
    if (rememberMe) {
      console.log("Логин есте сақталды:", login);
    }

    setLoggedIn(true);
  };

  // Избранныйға қосу / өшіру
  const toggleFavorite = (doctorId: string) => {
    if (favoriteDoctors.includes(doctorId)) {
      setFavoriteDoctors(
        favoriteDoctors.filter(
          (id) => id !== doctorId
        )
      );
    } else {
      setFavoriteDoctors([
        ...favoriteDoctors,
        doctorId,
      ]);
    }
  };

  // =========================
  // LOGIN SCREEN
  // =========================

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.loginCard}>

          <Text style={styles.hospitalTitle}>
            🏥 Hospital
          </Text>

          <Text style={styles.loginTitle}>
            Кіру
          </Text>

          {/* ЛОГИН */}
          <TextInput
            style={styles.input}
            placeholder="Логин"
            value={login}
            onChangeText={(text) => {
              setLogin(text);
              setError("");
            }}
          />

          {/* ПАРОЛЬ */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Пароль"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError("");
              }}
              secureTextEntry={!showPassword}
            />

            {/* КӨЗ БАТЫРМАСЫ */}
            <Pressable
              style={styles.eyeButton}
              onPress={() =>
                setShowPassword(!showPassword)
              }
            >
              <Text style={styles.eyeText}>
                {showPassword ? "🙈" : "👁️"}
              </Text>
            </Pressable>
          </View>

          {/* ЕСТЕ САҚТАУ */}
          <Pressable
            style={styles.rememberRow}
            onPress={() =>
              setRememberMe(!rememberMe)
            }
          >
            <View
              style={[
                styles.checkbox,
                rememberMe &&
                  styles.checkboxActive,
              ]}
            >
              {rememberMe && (
                <Text style={styles.checkText}>
                  ✓
                </Text>
              )}
            </View>

            <Text style={styles.rememberText}>
              Есте сақтау
            </Text>
          </Pressable>

          {/* ҚАТЕ */}
          {error !== "" && (
            <Text style={styles.errorText}>
              ❌ {error}
            </Text>
          )}

          {/* КІРУ */}
          <Pressable
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              Кіру
            </Text>
          </Pressable>

        </View>
      </View>
    );
  }

  // =========================
  // HOSPITAL DETAILS
  // =========================

  if (selectedHospital) {
    return (
      <View style={styles.container}>

        <Pressable
          style={styles.backButton}
          onPress={() =>
            setSelectedHospital(null)
          }
        >
          <Text style={styles.backText}>
            ← Басты бет
          </Text>
        </Pressable>

        <FlatList
          data={[selectedHospital]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>

              {/* АУРУХАНА БАСЫ */}
              <View style={styles.hospitalDetailCard}>

                <Text
                  style={
                    styles.hospitalDetailIcon
                  }
                >
                  {item.icon}
                </Text>

                <Text
                  style={
                    styles.hospitalDetailName
                  }
                >
                  {item.name}
                </Text>

                <Text
                  style={
                    styles.hospitalDescription
                  }
                >
                  {item.description}
                </Text>

              </View>

              {/* МЕКЕНЖАЙ */}
              <View style={styles.infoCard}>

                <Text style={styles.cardTitle}>
                  📍 Орналасқан жері
                </Text>

                <Text style={styles.cardText}>
                  {item.address}
                </Text>

              </View>

              {/* БАЙЛАНЫС */}
              <View style={styles.infoCard}>

                <Text style={styles.cardTitle}>
                  📞 Байланыс
                </Text>

                <Text style={styles.cardText}>
                  Телефон: {item.phone}
                </Text>

                <Text style={styles.cardText}>
                  Жұмыс уақыты:{" "}
                  {item.workingTime}
                </Text>

              </View>

              {/* ДӘРІГЕРЛЕР */}
              <View style={styles.infoCard}>

                <Text style={styles.cardTitle}>
                  👨‍⚕️ Қолжетімді дәрігерлер
                </Text>

                {item.doctors.map(
                  (doctor, index) => (
                    <View
                      key={index}
                      style={
                        styles.hospitalDoctorRow
                      }
                    >
                      <Text
                        style={
                          styles.hospitalDoctorIcon
                        }
                      >
                        👨‍⚕️
                      </Text>

                      <Text
                        style={
                          styles.hospitalDoctorText
                        }
                      >
                        {doctor}
                      </Text>
                    </View>
                  )
                )}

              </View>

              {/* ҚОСЫМША АҚПАРАТ */}
              <View style={styles.infoCard}>

                <Text style={styles.cardTitle}>
                  ℹ️ Қосымша ақпарат
                </Text>

                <Text style={styles.cardText}>
                  Пациенттер дәрігерлерді таңдап,
                  қабылдау уақытына алдын ала
                  жазыла алады.
                </Text>

                <Text style={styles.cardText}>
                  Қызмет көрсету уақыты ауруханаға
                  байланысты өзгеруі мүмкін.
                </Text>

              </View>

            </View>
          )}
        />

      </View>
    );
  }

  // =========================
  // DOCTOR SCHEDULE
  // =========================

  if (selectedDoctor) {
    const isFavorite =
      favoriteDoctors.includes(
        selectedDoctor.id
      );

    return (
      <View style={styles.container}>

        <Pressable
          style={styles.backButton}
          onPress={() =>
            setSelectedDoctor(null)
          }
        >
          <Text style={styles.backText}>
            ← Дәрігерлер
          </Text>
        </Pressable>

        <View style={styles.doctorInfo}>

          <Text style={styles.doctorIcon}>
            {selectedDoctor.icon}
          </Text>

          <View style={{ flex: 1 }}>

            <Text style={styles.doctorName}>
              {selectedDoctor.name}
            </Text>

            <Text style={styles.specialty}>
              {selectedDoctor.specialty}
            </Text>

          </View>

          {/* ИЗБРАННЫЙ */}
          <Pressable
            style={styles.favoriteButton}
            onPress={() =>
              toggleFavorite(
                selectedDoctor.id
              )
            }
          >
            <Text style={styles.favoriteIcon}>
              {isFavorite ? "⭐" : "☆"}
            </Text>
          </Pressable>

        </View>

        <Text style={styles.scheduleTitle}>
          Қабылдау уақыты
        </Text>

        <View style={styles.infoBox}>

          <Text style={styles.infoText}>
            🔴 Пациент жазылған
          </Text>

          <Text style={styles.infoText}>
            🟢 Жазылу — бос уақыт
          </Text>

          <Text style={styles.infoText}>
            ✅ Жазылдыңыз — сіздің уақытыңыз
          </Text>

        </View>

        <FlatList
          data={selectedDoctor.schedule}
          keyExtractor={(item) => item.time}
          renderItem={({ item }) => {

            const appointmentKey =
              selectedDoctor.id +
              "-" +
              item.time;

            const isMyAppointment =
              myAppointments.includes(
                appointmentKey
              );

            return (
              <View style={styles.timeCard}>

                <Text style={styles.time}>
                  🕐 {item.time}
                </Text>

                {/* АЛДЫН АЛА ЖАЗЫЛҒАН */}
                {item.booked ? (

                  <View
                    style={
                      styles.bookedButton
                    }
                  >
                    <Text
                      style={
                        styles.bookedText
                      }
                    >
                      🔴 Пациент жазылған
                    </Text>
                  </View>

                ) : isMyAppointment ? (

                  /* ӨЗІМІЗ ЖАЗЫЛҒАН */
                  <Pressable
                    style={
                      styles.myAppointmentButton
                    }
                    onPress={() => {

                      setMyAppointments(
                        myAppointments.filter(
                          (id) =>
                            id !==
                            appointmentKey
                        )
                      );

                    }}
                  >
                    <Text
                      style={
                        styles.myAppointmentText
                      }
                    >
                      ✅ Жазылдыңыз
                    </Text>
                  </Pressable>

                ) : (

                  /* БОС УАҚЫТ */
                  <Pressable
                    style={
                      styles.appointmentButton
                    }
                    onPress={() => {

                      setMyAppointments([
                        ...myAppointments,
                        appointmentKey,
                      ]);

                    }}
                  >
                    <Text
                      style={
                        styles.appointmentText
                      }
                    >
                      🟢 Жазылу
                    </Text>
                  </Pressable>

                )}

              </View>
            );
          }}
        />

      </View>
    );
  }

  // =========================
  // БАСТЫ БЕТ
  // =========================

  const HomePage = () => (
    <View style={styles.pageContent}>

      <Text style={styles.hospitalBig}>
        🏥 Hospital
      </Text>

      <Text style={styles.pageTitle}>
        Басты бет
      </Text>

      <Text style={styles.hospitalListTitle}>
        🏥 Ауруханалар
      </Text>

      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <Pressable
            style={styles.hospitalCard}
            onPress={() =>
              setSelectedHospital(item)
            }
          >

            <Text
              style={
                styles.hospitalCardIcon
              }
            >
              {item.icon}
            </Text>

            <View style={{ flex: 1 }}>

              <Text
                style={
                  styles.hospitalCardName
                }
              >
                {item.name}
              </Text>

              <Text
                style={
                  styles.hospitalCardAddress
                }
              >
                📍 {item.address}
              </Text>

              <Text
                style={
                  styles.hospitalCardTime
                }
              >
                🕐 {item.workingTime}
              </Text>

              <Text
                style={
                  styles.hospitalOpenText
                }
              >
                Толығырақ көру →
              </Text>

            </View>

          </Pressable>

        )}
      />

    </View>
  );

  // =========================
  // МОИ ДАННЫЕ
  // =========================

  const MyDataPage = () => (
    <View style={styles.pageContent}>

      <Text style={styles.pageTitle}>
        👤 Мои данные
      </Text>

      <View style={styles.profileCard}>

        <View style={styles.profileIcon}>
          <Text style={{ fontSize: 45 }}>
            👤
          </Text>
        </View>

        <Text style={styles.profileName}>
          {login}
        </Text>

        <Text style={styles.profileText}>
          Пациент
        </Text>

      </View>

      <View style={styles.infoCard}>

        <Text style={styles.cardTitle}>
          Жеке мәліметтер
        </Text>

        <Text style={styles.cardText}>
          Логин: {login}
        </Text>

        <Text style={styles.cardText}>
          Мәртебе: Пациент
        </Text>

        <Text style={styles.cardText}>
          Жазылған қабылдаулар:{" "}
          {myAppointments.length}
        </Text>

      </View>

    </View>
  );

  // =========================
  // ВРАЧТАР
  // =========================

  const DoctorsPage = () => (
    <View style={styles.pageContent}>

      <Text style={styles.pageTitle}>
        👨‍⚕️ Врачтар
      </Text>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {

          const isFavorite =
            favoriteDoctors.includes(
              item.id
            );

          return (
            <View style={styles.doctorCard}>

              <Pressable
                style={styles.doctorMain}
                onPress={() =>
                  setSelectedDoctor(item)
                }
              >

                <Text style={styles.doctorIcon}>
                  {item.icon}
                </Text>

                <View style={{ flex: 1 }}>

                  <Text style={styles.doctorName}>
                    {item.name}
                  </Text>

                  <Text style={styles.specialty}>
                    {item.specialty}
                  </Text>

                  <Text style={styles.openText}>
                    Кестені көру →
                  </Text>

                </View>

              </Pressable>

              {/* ИЗБРАННЫЙ */}
              <Pressable
                style={styles.starButton}
                onPress={() =>
                  toggleFavorite(item.id)
                }
              >
                <Text style={styles.starText}>
                  {isFavorite ? "⭐" : "☆"}
                </Text>
              </Pressable>

            </View>
          );
        }}
      />

    </View>
  );

  // =========================
  // ИЗБРАННЫЙ
  // =========================

  const FavoritesPage = () => {

    const favoriteList = doctors.filter(
      (doctor) =>
        favoriteDoctors.includes(
          doctor.id
        )
    );

    return (
      <View style={styles.pageContent}>

        <Text style={styles.pageTitle}>
          ⭐ Избранный
        </Text>

        {favoriteList.length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyIcon}>
              ☆
            </Text>

            <Text style={styles.emptyTitle}>
              Избранный бос
            </Text>

            <Text style={styles.emptyText}>
              Врачтар бөлімінен өзіңізге ұнаған
              дәрігерді ⭐ батырмасы арқылы
              таңдаңыз.
            </Text>

          </View>

        ) : (

          <FlatList
            data={favoriteList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (

              <View style={styles.doctorCard}>

                <Pressable
                  style={styles.doctorMain}
                  onPress={() =>
                    setSelectedDoctor(item)
                  }
                >

                  <Text
                    style={
                      styles.doctorIcon
                    }
                  >
                    {item.icon}
                  </Text>

                  <View
                    style={{ flex: 1 }}
                  >

                    <Text
                      style={
                        styles.doctorName
                      }
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={
                        styles.specialty
                      }
                    >
                      {item.specialty}
                    </Text>

                    <Text
                      style={
                        styles.openText
                      }
                    >
                      Кестені көру →
                    </Text>

                  </View>

                </Pressable>

                <Pressable
                  style={styles.starButton}
                  onPress={() =>
                    toggleFavorite(
                      item.id
                    )
                  }
                >
                  <Text
                    style={
                      styles.starText
                    }
                  >
                    ⭐
                  </Text>
                </Pressable>

              </View>

            )}
          />

        )}

      </View>
    );
  };

  // =========================
  // НЕГІЗГІ БЕТТІ ТАҢДАУ
  // =========================

  const renderPage = () => {

    if (currentPage === "home") {
      return <HomePage />;
    }

    if (currentPage === "data") {
      return <MyDataPage />;
    }

    if (currentPage === "doctors") {
      return <DoctorsPage />;
    }

    if (currentPage === "favorites") {
      return <FavoritesPage />;
    }

    return <HomePage />;
  };

  // =========================
  // MAIN APP
  // =========================

  return (
    <View style={styles.mainContainer}>

      {renderPage()}

      {/* ТӨМЕНГІ 4 НАВИГАЦИЯ */}

      <View style={styles.bottomNav}>

        {/* БАСТЫ БЕТ */}
        <Pressable
          style={styles.navItem}
          onPress={() => {
            setCurrentPage("home");
            setSelectedDoctor(null);
            setSelectedHospital(null);
          }}
        >
          <Text style={styles.navIcon}>
            🏠
          </Text>

          <Text
            style={[
              styles.navText,
              currentPage === "home" &&
                styles.navTextActive,
            ]}
          >
            Басты бет
          </Text>
        </Pressable>

        {/* МОИ ДАННЫЕ */}
        <Pressable
          style={styles.navItem}
          onPress={() => {
            setCurrentPage("data");
            setSelectedDoctor(null);
            setSelectedHospital(null);
          }}
        >
          <Text style={styles.navIcon}>
            👤
          </Text>

          <Text
            style={[
              styles.navText,
              currentPage === "data" &&
                styles.navTextActive,
            ]}
          >
            Мои данные
          </Text>
        </Pressable>

        {/* ВРАЧТАР */}
        <Pressable
          style={styles.navItem}
          onPress={() => {
            setCurrentPage("doctors");
            setSelectedDoctor(null);
            setSelectedHospital(null);
          }}
        >
          <Text style={styles.navIcon}>
            👨‍⚕️
          </Text>

          <Text
            style={[
              styles.navText,
              currentPage === "doctors" &&
                styles.navTextActive,
            ]}
          >
            Врачтар
          </Text>
        </Pressable>

        {/* ИЗБРАННЫЙ */}
        <Pressable
          style={styles.navItem}
          onPress={() => {
            setCurrentPage("favorites");
            setSelectedDoctor(null);
            setSelectedHospital(null);
          }}
        >
          <Text style={styles.navIcon}>
            ⭐
          </Text>

          <Text
            style={[
              styles.navText,
              currentPage === "favorites" &&
                styles.navTextActive,
            ]}
          >
            Избранный
          </Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 20,
  },

  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  pageContent: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
  },

  loginCard: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
    marginTop: 100,
  },

  hospitalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  hospitalBig: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  loginTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    backgroundColor: "white",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "white",
  },

  passwordInput: {
    flex: 1,
    padding: 14,
  },

  eyeButton: {
    padding: 10,
  },

  eyeText: {
    fontSize: 22,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#2563eb",
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxActive: {
    backgroundColor: "#2563eb",
  },

  checkText: {
    color: "white",
    fontWeight: "bold",
  },

  rememberText: {
    fontSize: 16,
  },

  errorText: {
    color: "#dc2626",
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  loginButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  hospitalListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  hospitalCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  hospitalCardIcon: {
    fontSize: 42,
    marginRight: 15,
  },

  hospitalCardName: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 7,
  },

  hospitalCardAddress: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 5,
  },

  hospitalCardTime: {
    fontSize: 14,
    color: "#4b5563",
  },

  hospitalOpenText: {
    marginTop: 8,
    color: "#2563eb",
    fontWeight: "bold",
  },

  hospitalDetailCard: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 15,
  },

  hospitalDetailIcon: {
    fontSize: 65,
    marginBottom: 10,
  },

  hospitalDetailName: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },

  hospitalDescription: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 15,
    lineHeight: 22,
  },

  hospitalDoctorRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  hospitalDoctorIcon: {
    fontSize: 22,
    marginRight: 10,
  },

  hospitalDoctorText: {
    fontSize: 16,
    color: "#374151",
  },

  infoCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 12,
  },

  cardText: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 8,
    lineHeight: 22,
  },

  profileCard: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 15,
  },

  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  profileName: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 5,
  },

  profileText: {
    fontSize: 15,
    color: "#6b7280",
  },

  doctorCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  doctorMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  doctorIcon: {
    fontSize: 40,
    marginRight: 15,
  },

  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  specialty: {
    fontSize: 15,
    color: "#6b7280",
  },

  openText: {
    marginTop: 8,
    color: "#2563eb",
    fontWeight: "600",
  },

  starButton: {
    padding: 8,
    marginLeft: 5,
  },

  starText: {
    fontSize: 28,
  },

  favoriteButton: {
    padding: 5,
  },

  favoriteIcon: {
    fontSize: 30,
  },

  backButton: {
    backgroundColor: "#e5e7eb",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 15,
  },

  backText: {
    fontSize: 16,
    fontWeight: "600",
  },

  doctorInfo: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  scheduleTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  infoBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },

  timeCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  time: {
    fontSize: 18,
    fontWeight: "bold",
  },

  appointmentButton: {
    backgroundColor: "#dcfce7",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  appointmentText: {
    color: "#166534",
    fontWeight: "bold",
  },

  bookedButton: {
    backgroundColor: "#fee2e2",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  bookedText: {
    color: "#991b1b",
    fontWeight: "bold",
  },

  myAppointmentButton: {
    backgroundColor: "#dbeafe",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  myAppointmentText: {
    color: "#1d4ed8",
    fontWeight: "bold",
  },

  emptyCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    marginTop: 20,
  },

  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    color: "#6b7280",
    lineHeight: 22,
  },

  // =========================
  // ТӨМЕНГІ НАВИГАЦИЯ
  // =========================

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 5,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  navIcon: {
    fontSize: 23,
    marginBottom: 3,
  },

  navText: {
    fontSize: 11,
    color: "#6b7280",
  },

  navTextActive: {
    color: "#2563eb",
    fontWeight: "bold",
  },

});